const Metadata = require('./metadata');
const fetch = require('node-fetch');
const db = require('../db');

class MovieMetadata extends Metadata {
    constructor() {
        super();
    }

    /**
     * Search for metadata about the movie
     * 
     * @param {String} movieName - The name of the movie 
     */
    getMetadata(movieName) {
        return new Promise((resolve, reject) => {
            fetch(`${this.getAPIUrl()}/search/movie?api_key=${this.getAPIKey()}&language=en-US&query=${movieName}&page=1&include_adult=true`)
            .then(res => res.json())
            .then(json => {
                if (json.total_results == 0) {
                    resolve(null);
                } else {
                    fetch(`${this.getAPIUrl()}/movie/${json.results[0].id}?api_key=${this.getAPIKey()}&language=en-US`)
                    .then(res => res.json())
                    .then(metadata => {
                        resolve(metadata);
                    });
                }
            });
        });
    }

    /**
     * Insert metadata in the database about a movie
     * 
     * @param {Object} metadata 
     * @param {Integer} internalMovieID 
     */
    insertMetadata(metadata, internalMovieID) {
        console.log(metadata);

        // If the metadata doesn't have any genre, add one (All movies need to have a genre)
        if (metadata.genres.length === 0) {
            metadata.genres.push({
                id: -1,
                name: 'other'
            });
        }
        for (let category of metadata.genres) {
            // Check if we already have saved the category from imdb
            db.any('SELECT * FROM category WHERE imdb_category_id = $1 ', [category.id]).then(async (categoryInDb) => {

                // If we haven't saved the category from IMDB, save it.
                if (categoryInDb.length === 0) {
                    await db.none('INSERT INTO category (imdb_category_id, name) VALUES ($1, $2)', [category.id, category.name.toLowerCase()])
                }
                // Save the movie category
                db.none("INSERT INTO movie_category (movie_id, category_id) VALUES ($1, $2)", [internalMovieID, category.id]);
            });

        }
        // Save metadata
        let d = new Date();
        db.none("INSERT INTO movie_metadata (movie_id, title, overview, poster, release_date, runtime, popularity, backdrop, added_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
            internalMovieID,
            metadata.title,
            metadata.overview,
            metadata.poster_path,
            metadata.release_date,
            metadata.runtime,
            metadata.popularity,
            metadata.backdrop_path,
            `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`
        ]);
    }
}

module.exports = MovieMetadata;