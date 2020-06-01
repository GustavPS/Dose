const Library = require('./library');
const db = require('../db');
const MovieMetadata = require('../metadata/movieMetadata');
const pathLib = require('path');
var ffmpeg = require('fluent-ffmpeg');

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
        db.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id]).then(async (result) => {
            if (result.length === 0) {
                console.log(` > Found a new movie (${path} for library: '${this.name}')`);
                console.log(` > Trying to convert subtitles, this may take a while...`);

                // Try to convert the subtitles from the movie
                new Promise(async (resolve, reject) => {
                    let subtitleConvertionResult = await this.convertSubtitles(movieName, path);
                
                    // If the conversion failed (because the file was busy), try again.
                    while(!subtitleConvertionResult) {
                        subtitleConvertionResult = await this.convertSubtitles(movieName, path);
                    }
                    resolve();
                });



                // Insert to the movie table (contining the path of the movie)
                db.any('INSERT INTO movie (path, library, name) VALUES ($1, $2, $3)', [path, this.id, movieName]).then(() => {
                    db.one('SELECT id FROM movie WHERE path = $1 AND library = $2', [path, this.id]).then(result => {
                        let internalMovieID = result.id;

                        // Try to find metadata
                        this.metadata.getMetadata(movieName).then(result => {
                            let metadata = result.metadata;
                            let images = result.images;
                            let trailer = result.trailer;
                            if (metadata === null) {
                                console.log(` > Couldn't find any metadata for movie '${movieName}'`);
                                images = {
                                    backdrops: [],
                                    posters: []
                                }
                                metadata = this.metadata.getDummyMetadata(movieName);
                                trailer = "";
                                
                                this.metadata.insertMetadata(metadata, images, trailer, internalMovieID);
                            } else {
                                console.log(` > Saving metadata for movie '${movieName}'`);
                                // Insert metadata
                                this.metadata.insertMetadata(metadata, images, trailer, internalMovieID);
                            }
                        })
                    });
                });

            }
        })
    }

    addSubtitleIfNotSaved(movieName, path, parentFolder) {
        let fileName = pathLib.basename(path);
        let language = null;
        for (let lang of this.subLanguages) {
            if (fileName.toString().toLocaleLowerCase().includes(lang.shortName)) {
                language = lang.longName;
                break;
            }
        }
        db.any("SELECT * FROM movie WHERE library = $1", [parseInt(this.id)]).then(movies => {
            for (let movie of movies) {
                let movieFolder =  pathLib.dirname(movie.path);
                if (movieFolder === parentFolder) {
                    db.any('SELECT * FROM subtitle WHERE movie_id = $1 AND path = $2 AND library_id = $3', [movie.id, path, movie.library]).then(result => {
                        if (result.length === 0) {
                            console.log(` > Saving subtitle for ${movieName} in library ${movie.library}`);
                            db.none('INSERT INTO subtitle (path, movie_id, library_id, language) VALUES ($1, $2, $3, $4)', [path, movie.id, movie.library, language]);
                        }
                    })
                }

            }
            // If we didn't find a matching movie by the subtitle name, try with the folderName
            if (movies.length === 0) {
                    console.log(`Couldn't find any matching movies for subtitle ${path}`);
            }
        });
    }
    
    async convertSubtitles(movieName, path) {
        return new Promise(resolve => {
            let fullPath = pathLib.join(this.path, path);
            ffmpeg
            .ffprobe(fullPath, function(err, metadata) {
                if (err) {
                    //console.log(err);
                    // TODO: Only resolve with false if the error is because it's bussy, else throw the error
                    resolve(false);
                    return;
                }
                let found = false;
                for (let stream of metadata.streams) {
                    if (stream.codec_type == 'subtitle' && stream.codec_name == 'subrip' && stream.tags != undefined) {
                        found = true;
                        let outputPath = pathLib.join(pathLib.dirname(fullPath), `${stream.tags.language}_EXTRACTED_${Math.floor(Math.random() * 1000000000)}.srt`); // TODO: Check if this file exist first
                        ffmpeg(fullPath)
                        .outputOption([
                            `-map 0:${stream.index}`
                        ])
                        .outputFormat('srt')
                        .output(outputPath)
                        .on('start', function(commandLine) {
                            console.log(` > Found a subtitle (${stream.tags.language}) for movie ${movieName}. Converting it now.`)
                        })
                        .on('error', function(err, stdout, stderr) {
                            console.log('an error happened converting subtitle: ' + err.message);
                            console.log(stdout);
                            console.log(stderr);
                        })
                        .run();
                    }
                }
                if (!found) {
                    console.log(` > No subtitles found in movie ${movieName}`);
                }
                resolve(true);
            });
        })


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

        if (type === 'MOVIE') {
            this.addMovieIfNotSaved(movieName, path);
        } else if (type === 'SUBTITLE') {
            this.addSubtitleIfNotSaved(movieName, path, parentFolder);
        }

    }

    /**
     * Remove the entry for PATH in the database
     * @param {String} path - Path to the removed movie
     */
    async removeEntry(path) {
        db.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id])
        .then(result => {
            if (result.length > 0) {
                console.log(` > Removing movie ${result[0].name} from '${this.name}'`);
                db.none('DELETE FROM movie WHERE path = $1 AND library = $2', [path, this.id]);
            }
        });
        db.any('SELECT * FROM subtitle WHERE path = $1 AND library_id = $2', [path, this.id])
        .then(result => {
            if (result.length > 0) {
                console.log(` > Removing a subtitle for Movie ID ${result[0].id} from '${this.name}'`);
                db.none('DELETE FROM subtitle WHERE path = $1 AND library_id = $2', [path, this.id]);
            }
        });

    }
}

module.exports = MovieLibrary;