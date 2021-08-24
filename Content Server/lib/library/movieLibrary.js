const Library = require('./library');
const db = require('../db');
const MovieMetadata = require('../metadata/movieMetadata');
const pathLib = require('path');
var ffmpeg = require('fluent-ffmpeg');
var AsyncLock = require('async-lock');
const lock = require('../globalLock');
const sockets = require('../../sockets');

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

    async addMovieIfNotSaved(movieName, path, possibleReleaseYear) {
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


                    let fileStreams = await this.getFileStreams(path);
                    if (!fileStreams) {
                        fileStreams = [];
                    }

                    // Get and save the resolutions
                    const resolution = this.getResolutions(fileStreams);
                    await t.none(
                        'INSERT INTO movie_resolution (movie_id, "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[
                        internalMovieID, resolution.p240, resolution.p360, resolution.p480, resolution.p720, resolution.p1080, resolution.p1440, resolution.p4k, resolution.p8k, resolution.codec
                    ]);

                    // TODO: Parse it as a boolean somehow
                    if (process.env.EXTRACT_SUBTITLES == "TRUE") {
                        console.log(` > Trying to convert subtitles, this may take a while...`);
                        let subtitleConvertionResult = await this.convertSubtitles(movieName, path, fileStreams);
    
                        // If the conversion failed (because the file was busy), try again.
                        while(!subtitleConvertionResult) {
                            await new Promise(r => setTimeout(r, 2000));
                            subtitleConvertionResult = await this.convertSubtitles(movieName, path, fileStreams);
                        }
                    }

                    // Find all the audio streams (languages) for the movie
                    let audio_streams = await this.findAudioStreams(fileStreams);
                    if (audio_streams) {
                        for (let stream of audio_streams) {
                            await t.none('INSERT INTO movie_language (movie_id, language, stream_index, codec) VALUES ($1, $2, $3, $4)', [internalMovieID, stream.language, stream.stream, stream.codec]);
                        }
                    }
                } else {
                    alreadyAdded = true;
                }
            }).then(data => {
                if (!alreadyAdded) {
                    this.metadata.getMetadata(movieName, possibleReleaseYear).then(result => {
                        let logYearInfo;
                        if (result.year != null) {
                            logYearInfo = `(${result.year})`;
                        } else {
                            logYearInfo = `(Unknown year)`;
                        }

                        console.log(` > Saving metadata for movie '${movieName}' ${logYearInfo}`);
                        this.metadata.insertMetadata(result.metadata, result.images, result.actors, result.recommendations,
                                                        result.trailer, internalMovieID).then(() => {
                                console.log(` > Downloading trailer for movie '${movieName}' ${logYearInfo}`)
                                this.downloadTrailer(result.trailer, movieName, path)
                                .then((trailerPath) => {
                                    if (trailerPath != false) {
                                        db.none('UPDATE movie SET trailer = $1 WHERE id = $2', [trailerPath, internalMovieID])
                                    } else {
                                        console.log(` > Trailer already downloaded`);
                                    }
                                    let back = undefined;
                                    for (let backdrop of result.images.backdrops) {
                                        console.log(backdrop);
                                        if(backdrop.active == true){
                                            back = backdrop.file_path
                                            break;
                                        }
                                    }
                                    console.log({"id": result.metadata.id, "title": result.metadata.title, "overview": result.metadata.overview, "backdrop_path": back})
                                    sockets.emit("MOVIE", {"id": result.metadata.id, "title": result.metadata.title, "overview": result.metadata.overview, "backdrop_path": back})
                                    
                                resolve();
                            });
                        });


                    }).catch(async (error) => {
                        console.log(` > Couldn't find any metadata for movie (using dummy data) '${movieName}'`);
                        let images = {
                            backdrops: [],
                            posters: [],
                            logos: []
                        }
                        let metadata = this.metadata.getDummyMetadata(movieName);
                        let trailer = "";
                        console.log(internalMovieID);
                        this.metadata.insertMetadata(metadata, images, [], [], trailer, internalMovieID).then(() => {
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
            let subtitleInfo = this.getSubtitleInfo(fileName);

            // TODO: There is a bug here, if multiple movies is in the same folder we will add the subtitle for all movies
            // However, having multiple movies in the same folder is not supported, but if that is changed
            // this have to be fixed
            db.any("SELECT * FROM movie WHERE library = $1", [parseInt(this.id)]).then(async (movies) => {
                for (let movie of movies) {
                    let movieFolder =  pathLib.dirname(movie.path);
                    if (movieFolder === parentFolder) {
                        let result = await db.any('SELECT * FROM subtitle WHERE movie_id = $1 AND path = $2 AND library_id = $3', [movie.id, path, movie.library]);
                        if (result.length === 0) {
                            console.log(` > Saving subtitle for ${movieName} in library ${movie.library}. Language: ${subtitleInfo.language}`);
                            await db.none('INSERT INTO subtitle (path, movie_id, library_id, language, synced, extracted) VALUES ($1, $2, $3, $4, $5, $6)',[path,
                                movie.id,
                                movie.library,
                                subtitleInfo.language,
                                subtitleInfo.synced,
                                subtitleInfo.extracted]);
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
        let possibleReleaseYear = [];
        try {
            let result = this.cleanNameAndType(path);
            movieName = result.name;
            type = result.type;
            parentFolder = result.parentFolder;
            possibleReleaseYear = result.possibleReleaseYear;
        } catch(e) {
            if (e.name === 'UnsupportedFormat') {
                console.log("\x1b[33m", `> ${path} is not a supported format.`, "\x1b[0m");
            } else {
                console.log(e);
            }
            return;
        }

        if (this.isFileTrailer(movieName)) {
            return;
        }

        let t = this;
	    lock.enter(async function (token) {
            if (type === 'MOVIE') {
                t.addMovieIfNotSaved(movieName, path, possibleReleaseYear).then(() => {
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
