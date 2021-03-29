const Library = require('./library');
const db = require('../db');
const MovieMetadata = require('../metadata/movieMetadata');
const pathLib = require('path');
var ffmpeg = require('fluent-ffmpeg');
var AsyncLock = require('async-lock');
const lock = require('../globalLock');

const LANGUAGE_LIST = require('../../lib/languages');


class MovieLibrary extends Library {

    /**
     * Creates a new instance of a movie library
     * 
     * @param {String} name - The name of the library
     * @param {String} path - The path of the library
     * @param {String} id - The id of the library
     */
    constructor(name, path, id) {
        super(name, path, id, new MovieMetadata());
    }

    getType() {
        return 'MOVIES';
    }

    async addMovieIfNotSaved(movieName, path) {
        return new Promise(async (resolve) => {
            let internalMovieID;
            let alreadyAdded = false;
            await db.tx(async t => {
                // Check if we have already saved this movie
                let result = await t.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id]);
                // If we haven't saved this movie, insert it
                if (result.length === 0) {
                    console.log(` > Found a new movie (${path} for library: '${this.name}')`);
                    // Insert into the movie table and get the assigned ID
                    internalMovieID = await t.one('INSERT INTO movie (path, library, name) VALUES ($1, $2, $3) RETURNING id', [path, this.id, movieName]);
                    internalMovieID = internalMovieID.id;

                    // Find all the audio streams (languages) for the movie
                    let audio_streams = await this.findAudioStreams(movieName, path);
                    if (audio_streams) {
                        for (let stream of audio_streams) {
                            await t.none('INSERT INTO movie_language (movie_id, language, stream_index) VALUES ($1, $2, $3)', [internalMovieID, stream.language, stream.stream]);
                        }
                    }
                } else {
                    alreadyAdded = true;
                }
            }).then(data => {
                if (!alreadyAdded) {
                    this.metadata.getMetadata(movieName).then(result => {
                        console.log(` > Saving metadata for movie '${movieName}'`);
                        this.metadata.insertMetadata(result.metadata, result.images,
                                                     result.trailer, internalMovieID).then(() => {
                            resolve();
                        });
                    }).catch(async (error) => {
                        console.log(` > Couldn't find any metadata for movie (using dummy data) '${movieName}'`);
                        let images = {
                            backdrops: [],
                            posters: []
                        }
                        let metadata = this.metadata.getDummyMetadata(movieName);
                        let trailer = "";
                        
                        this.metadata.insertMetadata(metadata, images, trailer, internalMovieID).then(() => {
                            resolve();
                        });
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    addSubtitleIfNotSaved(movieName, path, parentFolder) {
        return new Promise(async (resolve, reject) => {
            let fileName = pathLib.basename(path);
            let language = null;
            for (let lang of LANGUAGE_LIST) {
                if (fileName.toString().toLocaleLowerCase().includes('_' + lang.shortName)) {
                    language = lang.longName;
                    break;
                }
            }
            db.any("SELECT * FROM movie WHERE library = $1", [parseInt(this.id)]).then(async (movies) => {
                for (let movie of movies) {
                    let movieFolder =  pathLib.dirname(movie.path);
                    if (movieFolder === parentFolder) {
                        let result = await db.any('SELECT * FROM subtitle WHERE movie_id = $1 AND path = $2 AND library_id = $3', [movie.id, path, movie.library]);
                        if (result.length === 0) {
                            console.log(` > Saving subtitle for ${movieName} in library ${movie.library}`);
                            await db.none('INSERT INTO subtitle (path, movie_id, library_id, language) VALUES ($1, $2, $3, $4)', [path, movie.id, movie.library, language]);
                        }
                    }
    
                }
                // If we didn't find a matching movie by the subtitle name, try with the folderName
                if (movies.length === 0) {
                        console.log(`Couldn't find any matching movies for subtitle ${path}`);
                        reject();
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Add a new entry to the database about the movie PATH.
     * It will try to find and save metadata for the movie.
     * @param {String} path - The path to the movie
     */
    async newEntry(path) {
        let movieName;
        let type;
        let parentFolder;
        try {
            let result = this.cleanNameAndType(path);
            movieName = result.name;
            type = result.type;
            parentFolder = result.parentFolder;
        } catch(e) {
            if (e.name === 'UnsupportedFormat') {
                console.log("\x1b[33m", `> ${path} is not a supported format.`, "\x1b[0m");
            } else {
                console.log(e);
            }
            return;
        }
        let t = this;
	    lock.enter(async function (token) {
            if (type === 'MOVIE') {
                t.addMovieIfNotSaved(movieName, path).then(() => {
                    lock.leave(token);
                });
            } else if (type === 'SUBTITLE') {
                t.addSubtitleIfNotSaved(movieName, path, parentFolder).then(() => {
                    lock.leave(token);
                }).catch(error => {
                    // Didn't find a matchin movie, it is logged in the function call
                    lock.leave(token);
                })
            }
        });
    }

    /**
     * Remove the entry for PATH in the database
     * @param {String} path - Path to the removed movie
     */
    async removeEntry(path) {
        lock.enter(token => {
            db.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id])
            .then(result => {
                if (result.length > 0) {
                    console.log(` > Removing movie ${result[0].name} from '${this.name}'`);
                    db.none('DELETE FROM movie WHERE path = $1 AND library = $2', [path, this.id]);
                }
                db.any('SELECT * FROM subtitle WHERE path = $1 AND library_id = $2', [path, this.id])
                .then(result => {
                    if (result.length > 0) {
                        console.log(` > Removing a subtitle for Movie ID ${result[0].id} from '${this.name}'`);
                        db.none('DELETE FROM subtitle WHERE path = $1 AND library_id = $2', [path, this.id]);
                    }
                    lock.leave(token);
                });
        
            });
        });
    }
}

module.exports = MovieLibrary;
