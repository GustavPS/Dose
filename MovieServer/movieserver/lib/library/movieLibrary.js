const Library = require('./library');
const db = require('../db');
const MovieMetadata = require('../metadata/movieMetadata');

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

    addMovieIfNotSaved(movieName, path) {
        db.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id]).then(async (result) => {
            if (result.length === 0) {
                console.log(` > Found a new movie (${path} for library: '${this.name}')`);

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

    addSubtitleIfNotSaved(movieName, path) {
        console.log(path);
        console.log(movieName);
        db.any('SELECT * FROM movie WHERE library = $1 AND name = $2', [this.id, movieName]).then(movies => {
            for (let movie of movies) {
                db.any('SELECT * FROM subtitle WHERE movie_id = $1 AND path = $2 AND library_id = $3', [movie.id, path, movie.library]).then(result => {
                    if (result.length === 0) {
                        console.log(` > Saving subtitle for ${movieName} in library ${movie.library}`);
                        db.none('INSERT INTO subtitle (path, movie_id, library_id) VALUES ($1, $2, $3)', [path, movie.id, movie.library]);
                    }
                })
            }
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
        try {
            let result = this.cleanNameAndType(path);
            movieName = result.name;
            type = result.type;
        } catch(e) {
            if (e.name === 'UnsupportedFormat') {
                console.log(`${path} is not a supported format.`);
            } else {
                console.log(e);
            }
            return;
        }

        if (type === 'MOVIE') {
            this.addMovieIfNotSaved(movieName, path);
        } else if (type === 'SUBTITLE') {
            this.addSubtitleIfNotSaved(movieName, path);
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
                console.log(` > Removing movie ${result.name} from '${this.name}'`);
                db.none('DELETE FROM movie WHERE path = $1 AND library = $2', [path, this.id]);
            }
        });

    }
}

module.exports = MovieLibrary;