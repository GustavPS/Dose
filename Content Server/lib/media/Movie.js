const path = require('path');
const db = require('../db');
const Content = require('./Content');
const Logger = require('../logger');
const logger = new Logger();
const pgp = require('pg-promise')();



class Movie extends Content {
    #movieId;
    constructor (movieId) {
        super();
        this.#movieId = movieId;
    }

    /** GETTERS **/

    // TODO: Remove function and only use id getter function below
    get movieId() {
        return this.#movieId;
    }

    get id() {
        return this.#movieId;
    }

    getName() {
        return new Promise((resolve, reject) => {
            db.one(`SELECT title FROM movie_metadata WHERE movie_id = $1`, [this.#movieId]).then((result) => {
                resolve(result.title);
            }).catch(error => {
                logger.ERROR(`Could not get movie name for movie id ${this.#movieId}`);
                reject();
            });
        });
    }

    /** PRIVATE FUNCTIONS **/

    /**
     * Insert an image to the image table
     * 
     * @param {string} imagePath The path to this image
     * @param {transaction} t pg-promise transaction
     * @returns Promise
     */
    #insertToImageTable(imagePath, t) {
        return new Promise(resolve => {
            t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [imagePath], c => +c.id)
            .then(id => resolve(id));
        });
    }

    /**
     * Insert an image for this movie
     * 
     * @param {int} imageId The image ID (From the image table)
     * @param {boolean} active If this is the active image or not
     * @param {string} type The type of image (poster/backdrop/logo)
     * @param {transaction} t pg-promise transaction
     * @returns Promise
     */
    #insertToMovieImageTable(imageId, active, type, t) {
        return t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, $4)", [this.#movieId, imageId, active, type]);
    }

    /**
     * Resolves TRUE if an image of the spcified type is saved for this movie, FALSE otherwise
     * 
     * @param {string} type The image type (POSTER/BACKDROP/LOGO)
     * @returns Promise
     */
    #isImageTypeSaved(type) {
        return new Promise(resolve => {
            db.one("SELECT count(*) FROM movie_image WHERE movie_id = $1 AND type = $2", [this.#movieId, type])
            .then(result => resolve(result.count > 0));
        });
    }

    /** PUBLIC FUNCTIONS **/

    /**
     * Insert a list of images to this movie
     * 
     * @param {Array} images Array with JSON information about the images
     * @param {string} type POSTER/BACKDROP/LOGO
     * @returns Promise
     */
    insertImages(images, type, conn=db) {
        return conn.tx(async t => {
            let queries = [];
            for (let image of images) {
                const imageId = await this.#insertToImageTable(image.file_path, t);
                queries.push(this.#insertToMovieImageTable(imageId, image.active, type, t));
                //this.#insertToMovieImageTable(imageId, image.active, type, t);
            }
            return t.batch(queries);
        });
    }

    /**
     * Delete all images with a specific type for this movie
     * 
     * @param {string} type 
     * @returns Promise
     */
    deleteImages(type) {
        return db.none("DELETE FROM image WHERE id IN (SELECT image_id FROM movie_image WHERE movie_id = $1 AND type = $2)", [this.#movieId, type]);
    }

    /**
     * Updates the metadata with the image status (If a good image has been found)
     * 
     * @param {boolean} posterStatus 
     * @param {boolean} backdropStatus 
     * @param {boolean} logoStatus 
     */
    updateImageStatus(posterStatus, backdropStatus, logoStatus) {
        db.none("UPDATE movie_metadata SET found_good_poster = $1, found_good_backdrop = $2, found_good_logo = $3 WHERE movie_id = $4",
                [posterStatus, backdropStatus, logoStatus, this.#movieId]);

    }

    /**
     * Resolves TRUE if a poster is saved for this movie
     * 
     * @returns Promise
     */
    havePosterSaved() {
        return this.#isImageTypeSaved("POSTER");
    }

    /**
     * Resolves TRUE if a logo is saved for this movie
     * 
     * @returns Promise
     */
    haveLogoSaved() {
        return this.#isImageTypeSaved("LOGO");
    }

    /**
     * Resolves TRUE if a backdrop is saved for this movie
     * 
     * @returns Promise
     */
    haveBackdropSaved() {
        return this.#isImageTypeSaved("BACKDROP");
    }

    /**
     * Inserts the movies genres to the database
     * 
     * @param {Array} genres Array of the genre IDs and titles
     * @param {Transaction} conn pg-promise transaction (OPTIONAL)
     * @returns Promise
     */
    addMovieGenres(genres, conn=db) {
        return conn.tx(async t => {
            let queries = [];
            for (let category of genres) {
                let q = t.any('SELECT * FROM category WHERE imdb_category_id = $1 ', [category.id])
                .then(res => res.length !== 0)
                .then(async categoryExist => {
                    if (!categoryExist) {
                        await t.none('INSERT INTO category (imdb_category_id, name) VALUES ($1, $2)', [category.id, category.name.toLowerCase()])
                    }
                    return t.none("INSERT INTO movie_category (movie_id, category_id) VALUES ($1, $2)", [this.#movieId, category.id]);
                });
                queries.push(q);
            }
            return t.batch(queries);
        });
    }

    /**
     * Inserts the movies actors to the database
     * 
     * @param {Array} actors Array of the actors
     * @param {Tranasction} conn pg-promise transaction (OPTIONAL)
     * @returns 
     */
    addMovieActors(actors, conn=db) {
        return conn.tx(async t => {
            let queries = [];
            let addedActors = [];
            for (const actor of actors) {
                if(addedActors.includes(actor.id)) {
                    continue;
                }
                addedActors.push(actor.id);

                let q = t.any('SELECT * FROM actor WHERE id = $1', [actor.id])
                .then(res => res.length !== 0)
                .then(async actorExist => {
                    if (!actorExist) {
                        const q2 = pgp.as.format('INSERT INTO actor (id, name, image) VALUES ($1, $2, $3)', [actor.id, actor.name, actor.profile_path]);
                        await t.none(q2);
                    }
                    const q = pgp.as.format("INSERT INTO movie_actor (actor_id, movie_id, character_name, order_in_credit) VALUES ($1, $2, $3, $4)", [actor.id, parseInt(this.#movieId), actor.character, actor.order]);
                    return t.none(q);
                });
                queries.push(q);
            }
            return t.batch(queries);
        });
    }

    /**
     * Inserts the movies recommendations
     * 
     * @param {Array} recommendations Array with the movies recommendations
     * @param {Transaction} conn pg-promise transaction (OPTIONAL)
     * @returns 
     */
    addRecommendations(recommendations, conn=db) {
        return conn.tx(t => {
            let i = 0;
            let queries = [];
            for (const movie of recommendations) {
                queries.push(t.none("INSERT INTO movie_recommended (movie_id_1, movie_id_2, priority) VALUES ($1, $2, $3)", [this.#movieId, movie.movie_id, i]));
                i++;
            }
            return t.batch(queries);
        });
    }

    /**
     * Insert metadata for a movie
     * 
     * @param {string} title Movie title
     * @param {string} overview Movie overview
     * @param {string} posterPath Path to movies poster
     * @param {string} releaseDate The movies release date
     * @param {int} runtime The movies runtime
     * @param {int} popularity The movies popularity
     * @param {string} backdropPath The movies backdrop path
     * @param {string} trailer The trailer path
     * @param {int} tmdbId The movies tmdb ID
     * @param {boolean} foundPoster If a poster have been found
     * @param {boolean} foundBackdrop If a backdrop have been found
     * @param {boolean} foundLogo If a logo have been found
     * @param {transaction} conn pg-promise Transaction (OPTIONAL)
     * @returns Promise
     */
    insertMetadata(title, overview, posterPath, releaseDate, runtime, popularity,
        backdropPath, trailer, tmdbId, foundPoster, foundBackdrop, foundLogo, conn=db) {
            return conn.none("INSERT INTO movie_metadata (movie_id, title, overview, poster, release_date, runtime, popularity, backdrop, added_date, trailer, run_time, tmdb_id, found_good_poster, found_good_backdrop, found_good_logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)", [
                this.#movieId,
                title,
                overview,
                posterPath,
                releaseDate,
                runtime,
                popularity,
                backdropPath,
                `${Date.now()}`,
                trailer,
                runtime === -1 ? -1 : runtime * 60, // insert -1 if runtime is -1 (when we use dummy metadata)
                tmdbId,
                foundPoster,
                foundBackdrop,
                foundLogo
            ]);
        }

    getFilePath() {
        return new Promise((resolve, reject) => {
            db.one(`SELECT movie.path AS subpath, library.path AS basepath FROM library 
                    INNER JOIN movie
                    ON movie.library = library.id AND movie.id = $1
                  `, [this.#movieId]).then((result) => {
                    resolve(path.join(result.basepath, result.subpath))
            }).catch(error => {
              reject();
            });
        });
    }

    getResolutions() {
        return new Promise((resolve, reject) => {
            db.one('SELECT "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec" FROM movie_resolution WHERE movie_id = $1', [this.#movieId]).then(result => {
                resolve(result);
            }).catch(error => {
              logger.ERROR(`Can't get movie resolution: ${error}`);
              reject();
            });
        });
    }

    getSubtitles() {
        return new Promise(resolve => {
            db.any('SELECT id, language, synced, extracted FROM subtitle WHERE movie_id = $1', [this.#movieId]).then(subtitles => {
                resolve(subtitles);
            })
        });
    }

    getAudioCodecs() {
        return new Promise((resolve, reject) => {
            db.many("SELECT language, codec, stream_index FROM movie_language WHERE movie_id = $1 ORDER BY stream_index", [this.#movieId]).then(result => {
                resolve(result);
            }).catch(error => {
                logger.ERROR(`Error getting movie codecs: ${error}`);
                reject();
            });
        });
    }

    getAudioCodecByStreamIndex(streamIndex) {
        return new Promise((resolve, reject) => {
            db.one("SELECT language, codec, stream_index FROM movie_language WHERE movie_id = $1 AND stream_index = $2", [this.#movieId, streamIndex]).then(result => {
                resolve(result);
            }).catch(error => {
                logger.ERROR(`Error getting movie codec ${streamIndex}: ${error}`);
                reject();
            });
        });
    }

    isDirectplayReady() {
        return new Promise((resolve, reject) => {
            db.one("SELECT directplay_ready FROM movie_metadata WHERE movie_id = $1", [this.#movieId]).then(result => {
                resolve(result.directplay_ready);
            }).catch(error => {
                logger.ERROR(`Error getting directplay status: ${error}`);
                reject();
            });
        });
    }

    getBackdrop() {
        return new Promise((resolve, reject) => {
            db.one(
                `SELECT path FROM image
                INNER JOIN movie_image ON movie_image.image_id = image.id
                WHERE movie_image.movie_id = $1 AND movie_image.type = 'BACKDROP' AND movie_image.active = true
            `, [this.#movieId]).then(result => {
                resolve(result.path);
            }).catch(error => {
                logger.ERROR(`Error getting backdrop: ${error}`);
                reject();
            });
        });
    }

    getType() {
        return 'movie';
    }

    async getM3u8Path() {
        const videoPath = await this.getFilePath();
        const videoFolder = path.parse(videoPath).dir;
        const m3u8Path = path.join(videoFolder, `index.m3u8`);
        return m3u8Path;
    }

}

module.exports = Movie;