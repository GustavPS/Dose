const Metadata = require('./metadata');
const fetch = require('node-fetch');
const db = require('../db');


class MovieMetadata extends Metadata {
    constructor() {
        super();
    }

    getMetadataByYear(movieName, year=null) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/search/movie?api_key=${this.getAPIKey()}&language=en-US&query=${movieName}&year=${year}&page=1&include_adult=true`))
            .then(res => res.json())
            .then(json => {
                if (json.total_results == 0) {
                    reject("Not found");
                } else {
                    fetch(encodeURI(`${this.getAPIUrl()}/movie/${json.results[0].id}?api_key=${this.getAPIKey()}&language=en-US`))
                    .then(res => res.json())
                    .then(metadata => {
                        this.getImages(json.results[0].id)
                        .then(images => {
                            let active = true;
                            let foundPrefferedLanguage = false;
                            let count = 0;
                            let prefferedLanguageIndex = -1;
                            for (let image of images.backdrops) {
                                if (image.iso_639_1 == 'en' && !foundPrefferedLanguage) {
                                    image.active = true;
                                    foundPrefferedLanguage = true;
                                    prefferedLanguageIndex = count;
                                    active = false;
                                } else {
                                    image.active = active;
                                    active = false;
                                }
                                count++;
                            }
                            if (foundPrefferedLanguage && images.backdrops.length > 0 && prefferedLanguageIndex != 0) {
                                images.backdrops[0].active = false;
                            }
                            active = true;
                            for (let image of images.posters) {
                                image.active = active;
                                active = false;
                            }

                            this.getTrailer(json.results[0].id).then(trailer => {
                                let result = {
                                    metadata: metadata,
                                    images: images,
                                    trailer: trailer,
                                    year: year
                                }
                                resolve(result);
                            });
                        });
                    });
                }
            });
        });
    }

    /**
     * Search for metadata about the movie
     * 
     * @param {String} movieName - The name of the movie 
     */
    getMetadata(movieName, possibleReleaseYear) {
        return new Promise(async (resolve, reject) => {
            let found = false;
            for (let year of possibleReleaseYear) {
                try {
                    let result = await this.getMetadataByYear(movieName, year);
                    // We found the movie by looking at the year, resolve it
                    found = true;
                    resolve(result);
                    break;
                } catch (error) {
                    if (error != "Not found") {
                        console.log("ERROR: in getMetadata, look at next line for full error message");
                        console.log(error);
                    }
                }
            }

            // If we didn't find it by looking at the year, try without the year
            if (!found) {
                this.getMetadataByYear(movieName).then(result => {
                    resolve(result);
                }).catch(error => {
                    // Metadata not found
                    reject(error);
                });
            }
        });
    }


    getImages(movieID) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${movieID}/images?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null`))
            .then(res => res.json())
            .then(images => {
                resolve(images);
            })
        });
    }

    getTrailer(movieID) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${movieID}/videos?api_key=${this.getAPIKey()}`))
            .then(res => res.json())
            .then(videos => {
                for (let video of videos.results) {
                    if (video.type === 'Trailer') {
                        resolve(video.key);
                        return;
                    }
                }
                resolve(null);
            })
        });
    }

    /**
     * Insert metadata in the database about a movie
     * 
     * @param {Object} metadata 
     * @param {Integer} internalMovieID 
     */
    async insertMetadata(metadata, images, trailer, internalMovieID) {
        return new Promise(async (resolve, reject) => {
            // If the metadata doesn't have any genre, add one (All movies need to have a genre)
            if (metadata.genres.length === 0) {
                metadata.genres.push({
                    id: -1,
                    name: 'other'
                });
            }
            for (let category of metadata.genres) {
                // Check if we already have saved the category from imdb
                let categoryInDb = await db.any('SELECT * FROM category WHERE imdb_category_id = $1 ', [category.id]);
                // If we haven't saved the category from IMDB, save it.
                if (categoryInDb.length === 0) {
                    await db.none('INSERT INTO category (imdb_category_id, name) VALUES ($1, $2)', [category.id, category.name.toLowerCase()])
                }
                // Save the movie category
                await db.none("INSERT INTO movie_category (movie_id, category_id) VALUES ($1, $2)", [internalMovieID, category.id]);

            }
            // SAVE METADATA
            await db.none("INSERT INTO movie_metadata (movie_id, title, overview, poster, release_date, runtime, popularity, backdrop, added_date, trailer, run_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
                internalMovieID,
                metadata.title,
                metadata.overview,
                metadata.poster_path,
                metadata.release_date,
                metadata.runtime,
                metadata.popularity,
                metadata.backdrop_path,
                `${Date.now()}`,
                trailer,
                metadata.runtime === -1 ? -1 : metadata.runtime * 60 // insert -1 if runtime is -1 (when we use dummy metadata)
            ]);




            // SAVE IMAGES
            // If the movie don't have a image, push one. All the movies need to have a image.
            if (images.backdrops.length === 0) {
                images.backdrops.push({
                    file_path: 'no_image',
                    active: true
                });
            }
            if (images.posters.length === 0) {
                images.posters.push({
                    file_path: 'no_image',
                    active: true
                })
            }
            // TODO: This will push "no_name" to image even if it already exist. That is not needed
            await db.tx(async t => {
                for (let backdrop of images.backdrops) {
                    const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [backdrop.file_path], c => +c.id);
                    t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'BACKDROP')", [internalMovieID, imageId, backdrop.active]);
                }

                // TODO: This will push "no_name" to image even if it already exist. That is not needed.
                for (let poster of images.posters) {
                    const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [poster.file_path], c => +c.id);
                    t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'POSTER')", [internalMovieID, imageId, poster.active]);
                }
                return;
            });
            resolve();
        });
    }
}

module.exports = MovieMetadata;