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

    async newEntry(path) {
        db.any('SELECT * FROM movie WHERE path = $1 AND library = $2', [path, this.id]).then(async (result) => {
            if (result.length === 0) {
                console.log(` > Found a new movie (${path} for library: '${this.name}')`);

                // Insert to the movie table (contining the path of the movie)
                db.any('INSERT INTO movie (path, library) VALUES ($1, $2)', [path, this.id]).then(() => {
                    db.one('SELECT id FROM movie WHERE path = $1 AND library = $2', [path, this.id]).then(result => {
                        let internalMovieID = result.id;


                        // Clean the path so we only get the movie name
                        let movieName = path.substring(0, path.indexOf('.'));
                        movieName = movieName.substring(movieName.lastIndexOf("/") + 1);
                        movieName = movieName.substring(movieName.lastIndexOf("\\") + 1);
                        
                        console.log(` > Searching for metadata for movie '${movieName}'`);
                        // Try to find metadata
                        this.metadata.getMetadata(movieName).then(metadata => {
                            if (metadata === null) {
                                console.log(` > Couldn't find any metadata for movie '${movieName}'`);
                            } else {
                                console.log(` > Saving metadata for movie '${movieName}'`);
                                // Insert metadata
                                this.metadata.insertMetadata(metadata, internalMovieID);
                            }
                        })
                    });
                });

            }
        })

    }

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