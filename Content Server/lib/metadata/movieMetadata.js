const Metadata = require('./metadata');
const fetch = require('node-fetch');
const db = require('../db');
const Logger = require('../logger');
const logger = new Logger().getInstance();


class MovieMetadata extends Metadata {
    constructor() {
        super();
    }

    getBadImages() {
        return new Promise(resolve => {
            db.tx(async t => {
                t.any("SELECT title, movie_id, tmdb_id, found_good_poster, found_good_backdrop, found_good_logo FROM movie_metadata WHERE (found_good_poster = FALSE OR found_good_backdrop = FALSE OR found_good_logo = FALSE) AND tmdb_id != -1")
                .then(movies => {
                    resolve(movies);
                });
            });
        });
    }

    /**
     * Fetches new images for a movie and updates the DB if needed
     * 
     * @param {string} title The movie title
     * @param {int} movieId The internal movie ID
     * @param {int} tmdbId The TMDB movie ID
     * @param {boolean} needPoster True if this movie need a new poster
     * @param {boolean} needBackdrop True if this movie need a new backdrop
     * @param {boolean} needLogo True if this movie need a new logo
     */
    updateImages(title, movieId, tmdbId, needPoster, needBackdrop, needLogo) {
        return new Promise(resolve => {
            this.getImages(tmdbId)
            .then(async (images) => {
                // Backdrops
                let processedImages = this.setPrefferedImage('en', images.backdrops);
                images.backdrops.list = processedImages.images;
                images.backdrops.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;

                // Posters
                processedImages = this.setPrefferedImage('en', images.posters);
                images.posters.list = processedImages.images;
                images.posters.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;

                // Logos
                processedImages = this.setPrefferedImage('en', images.logos, true);
                images.logos.list = processedImages.images;
                images.logos.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;

                const haveLogo     = await this.movieHasAnyLogoSaved(movieId);
                const havePoster   = await this.movieHasAnyPosterSaved(movieId);
                const haveBackdrop = await this.movieHasAnyBackdropSaved(movieId);
                
                await db.tx(async t => {
                    const anythingUpdated = false;
                    // If we don't have any logos saved but found some now, save them no matter if we found preffered logo or not
                    if (!haveLogo && images.logos.list.length > 0) {
                        logger.INFO(`No earlier logos saved for movie ${title}. Saving now`);
                        for (let logo of images.logos.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [logo.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'LOGO')", [movieId, imageId, logo.active]);
                        }
                        anythingUpdated = true;
                    }

                    // If we don't have any posters saved but found some now, save them no matter if we found preffered logo or not
                    if (!havePoster && images.posters.list.length > 0) {
                        logger.INFO(`No earlier posters saved for movie ${title}. Saving now`);
                        for (let poster of images.posters.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [poster.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'POSTER')", [movieId, imageId, poster.active]);
                        }
                        anythingUpdated = true;
                    }

                    // If we don't have any backdrops saved but found some now, save them no matter if we found preffered logo or not
                    if (!haveBackdrop && images.backdrops.list.length > 0) {
                        logger.INFO(`No earlier backdrops saved for movie ${title}. Saving now`);
                        for (let backdrop of images.backdrops.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [backdrop.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'BACKDROP')", [movieId, imageId, backdrop.active]);
                        }
                        anythingUpdated = true;
                    }

                    // If we have saved bad logos and found a good logo now, remove the old ones and insert the new ones
                    if (haveLogo && needLogo && images.logos.foundPrefferedLanguage) {
                        logger.INFO(`Found better logo for movie ${title}. Saving now`);
                        await t.none("DELETE FROM image WHERE id IN (SELECT image_id FROM movie_image WHERE movie_id = $1 AND type = 'LOGO')", movieId);

                        for (let logo of images.logos.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [logo.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'LOGO')", [movieId, imageId, logo.active]);
                        }
                        anythingUpdated = true;
                    }

                    // If we have saved bad posters and found a good poster now, remove the old ones and insert the new ones
                    if (havePoster && needPoster && images.posters.foundPrefferedLanguage) {
                        logger.INFO(`Found better poster for movie ${title}. Saving now`);
                        await t.none("DELETE FROM image WHERE id IN (SELECT image_id FROM movie_image WHERE movie_id = $1 AND type = 'POSTER')", movieId);

                        for (let logo of images.posters.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [logo.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'POSTER')", [movieId, imageId, logo.active]);
                        }
                        anythingUpdated = true;
                    }

                    // If we have saved bad backdrops and found a good backdrops now, remove the old ones and insert the new ones
                    if (haveBackdrop && needBackdrop && images.backdrops.foundPrefferedLanguage) {
                        logger.INFO(`Found better backdrop for movie ${title}. Saving now`);
                        await t.none("DELETE FROM image WHERE id IN (SELECT image_id FROM movie_image WHERE movie_id = $1 AND type = 'BACKDROP')", movieId);

                        for (let logo of images.backdrops.list) {
                            const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [logo.file_path], c => +c.id);
                            t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'BACKDROP')", [movieId, imageId, logo.active]);
                        }
                        anythingUpdated = true;
                    }

                    t.none("UPDATE movie_metadata SET found_good_poster = $1, found_good_backdrop = $2, found_good_logo = $3 WHERE movie_id = $4",
                            [images.posters.foundPrefferedLanguage, images.backdrops.foundPrefferedLanguage, images.logos.foundPrefferedLanguage, movieId]);

                    if (!anythingUpdated) {
                        logger.INFO(`Didn't find any better images for movie ${title}. Still need: ${needBackdrop ? 'Backdrop ' : ''}${needPoster ? 'Poster ' : ''}${needLogo ? 'Logo ' : ''}`);
                    }
                    return;
                })
                .catch(error => {
                    logger.ERROR(`Error while updating images for movie ${title}. Error: ${error}`);
                    resolve();
                });
                resolve();
            });
        });
    }

    movieHasAnyPosterSaved(movieId) {
        return new Promise(resolve => {
            db.one("SELECT count(*) FROM movie_image WHERE movie_id = $1 AND type = 'POSTER'", movieId)
            .then(result => {
                resolve(result.count > 0);
            });
        });
    }

    movieHasAnyBackdropSaved(movieId) {
        return new Promise(resolve => {
            db.one("SELECT count(*) FROM movie_image WHERE movie_id = $1 AND type = 'BACKDROP'", movieId)
            .then(result => {
                resolve(result.count > 0);
            });
        });
    }

    movieHasAnyLogoSaved(movieId) {
        return new Promise(resolve => {
            db.one("SELECT count(*) FROM movie_image WHERE movie_id = $1 AND type = 'LOGO'", movieId)
            .then(result => {
                resolve(result.count > 0);
            });
        });
    }


    setPrefferedImage(language, images, useLowestAspectRatio=false) {
        let active = true;
        let foundPrefferedLanguage = false;
        let count = 0;
        let prefferedLanguageIndex = -1;
        let highestAspectRatio = -1;

        for (let image of images) {
            if (image.iso_639_1 == language) {
                if (useLowestAspectRatio) {
                    // If this image has a better aspect ratio
                    if (image.aspect_ratio > highestAspectRatio) {
                        highestAspectRatio = image.aspect_ratio;

                        // If we have already found another one, set the other one to not active
                        if (foundPrefferedLanguage) {
                            images[prefferedLanguageIndex].active = false;
                        }
                    } else if (foundPrefferedLanguage) {
                        // If this didn't have better aspect ratio, skip this one
                        image.active = false;
                        active = false;
                        count++;
                        continue;
                    }
                } else if (foundPrefferedLanguage) {
                    image.active = false;
                    count++;
                    continue;
                }

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
        if (foundPrefferedLanguage && images.length > 0 && prefferedLanguageIndex != 0) {
            images[0].active = false;
        }

        return {
            images: images,
            foundPrefferedLanguage: foundPrefferedLanguage
        }
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
                        this.getActors(json.results[0].id)
                        .then(actors => {
                            this.getRecommended(json.results[0].id)
                            .then(recommendations => {
                                this.getImages(json.results[0].id)
                                .then(images => {
                                    // Backdrops
                                    let processedImages = this.setPrefferedImage('en', images.backdrops);
                                    images.backdrops.list = processedImages.images;
                                    images.backdrops.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;

                                    // Posters
                                    processedImages = this.setPrefferedImage('en', images.posters);
                                    images.posters.list = processedImages.images;
                                    images.posters.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;

                                    // Logos
                                    processedImages = this.setPrefferedImage('en', images.logos, true);
                                    images.logos.list = processedImages.images;
                                    images.logos.foundPrefferedLanguage = processedImages.foundPrefferedLanguage;
        
                                    this.getTrailer(json.results[0].id).then(trailer => {
                                        let result = {
                                            metadata: metadata,
                                            images: images,
                                            actors: actors,
                                            recommendations: recommendations,
                                            trailer: trailer,
                                            year: year
                                        }
                                        resolve(result);
                                    });
                                });
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
                        logger.ERROR("Error while getting metadata, look at next line for full error message");
                        logger.ERROR(error);
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

    /**
     * Get a list of posters, backdrops and logos for a movie
     * 
     * @param {int} movieID TMDB id for the movie
     * @returns 
     */
    getImages(movieID) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${movieID}/images?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null`))
            .then(res => res.json())
            .then(images => {
                resolve(images);
            })
        });
    }

    getActors(movieID) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${movieID}/credits?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null`))
            .then(res => res.json())
            .then(credits => credits.cast)
            .then(credits => {
                let actors = [];
                for (const actor of credits) {
                    if (actor.known_for_department === 'Acting' &&
                        !actor.character.includes("uncredited") &&
                        actor.popularity >= 1.0) {
                        actors.push(actor);
                    }
                }
                resolve(actors);
            });
        });
    }

    getRecommended(movieID) {
        return new Promise(async (resolve, reject) => {
            const request = (page, list=[], count=0) => {
                return new Promise((resolve) => {
                    fetch(encodeURI(`${this.getAPIUrl()}/movie/${movieID}/recommendations?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null&page=${page}`))
                    .then(res => res.json())
                    .then(result => {
                        const pages = result.total_pages;
                        const recommendations = result.results;
                        for(const recommendation of recommendations) {
                            list.push({
                                id: recommendation.id,
                                priority: count
                            });
                            count++;
                        }
                        if (page+1 > pages) {
                            resolve(list);
                        } else {
                            resolve(request(page+1, list, count));
                        }
                    });
                });
            };

            const recommendations = await request(1);
            const unorderedMovies = [];
            for (let i = 0; i < recommendations.length; i++) {
                unorderedMovies.push(recommendations[i].id);
            }
            const existingMovies = await this.getMoviesByTmdbIds(unorderedMovies);

            let orderedRecommendations = [];
            for (let i = 0; i < recommendations.length; i++) {
                for (let j = 0; j < existingMovies.length; j++) {
                    if (parseInt(recommendations[i].id) === parseInt(existingMovies[j].tmdb_id)) {
                        let alreadyAdded = false;
                        for (let k = 0; k < orderedRecommendations.length; k++) {
                            if (orderedRecommendations[k].movie_id === existingMovies[j].movie_id) {
                                alreadyAdded = true;
                                break;
                            }
                        }
                        if (!alreadyAdded) {
                            orderedRecommendations.push(existingMovies[j]);
                            break;
                        }
                    }
                }
            }
            resolve(orderedRecommendations);
        });
    }


    getMoviesByTmdbIds(IDs) {
        return new Promise(async (resolve) => {
            const result = await db.any("SELECT movie_id, tmdb_id FROM movie_metadata WHERE tmdb_id = ANY ($1)", [IDs]);
            resolve(result);
        });
    }

    getPopularMovies() {
        return new Promise(async (resolve) => {
            const request = (page=0, list=[]) => {
                return new Promise((resolve) => {
                    fetch(encodeURI(`${this.getAPIUrl()}/movie/popular?api_key=${this.getAPIKey()}`))
                    .then(res => res.json())
                    .then(result => {
                        const movies = result.results;
                        for (const movie of movies) {
                            list.push(movie.id);
                        }

                        // Get max 3 pages (60 results)
                        if (page + 1 >= result.total_pages || page + 1 >= 3) {
                            resolve(list);
                        } else {
                            resolve(request(page+1, list));
                        }
                    });
                });
            };

            const movies = await request();
            this.getMoviesByTmdbIds(movies)
            .then(movies => {
                resolve(movies);
            });
        });
    }

    updatePopularMovies(movies) {
        return new Promise(async (resolve) => {
            db.tx(async t => {
                await t.none("TRUNCATE movie_popular");
                for (const movie of movies) {
                    t.none("INSERT INTO movie_popular (movie_id) VALUES ($1)", movie.movie_id);
                }
                return;
            }).then(result => {
                resolve();
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
    async insertMetadata(metadata, images, actors, recommendations, trailer, internalMovieID) {
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
            await db.none("INSERT INTO movie_metadata (movie_id, title, overview, poster, release_date, runtime, popularity, backdrop, added_date, trailer, run_time, tmdb_id, found_good_poster, found_good_backdrop, found_good_logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)", [
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
                metadata.runtime === -1 ? -1 : metadata.runtime * 60, // insert -1 if runtime is -1 (when we use dummy metadata)
                metadata.id,
                images.posters.foundPrefferedLanguage,
                images.backdrops.foundPrefferedLanguage,
                images.logos.foundPrefferedLanguage
            ]);


            // SAVE ACTORS
            // If we couldn't find any actors, save one anyways. All movies need to have atleast one Actor
            if (actors.length === 0) {
                actors.push({
                    id: -1,
                    name: 'Unknown',
                    character: 'Unknown',
                    profile_path: 'no_image',
                    order: 0
                });
            }

            await db.tx(async t => {
                let addedActors = [];
                for (const actor of actors) {
                    if(addedActors.includes(actor.id)) {
                        continue;
                    }
                    // Check if we have already saved this actor
                    let actorInDb = await t.any('SELECT * FROM actor WHERE id = $1', [actor.id]);
                    // If we haven't saved the actor, save it
                    if (actorInDb.length === 0) {
                        await t.none('INSERT INTO actor (id, name, image) VALUES ($1, $2, $3)', [actor.id, actor.name, actor.profile_path]);
                    }
                    // Save the actor to the movie
                    await t.none("INSERT INTO movie_actor (actor_id, movie_id, character_name, order_in_credit) VALUES ($1, $2, $3, $4)", [actor.id, internalMovieID, actor.character, actor.order]);
                    addedActors.push(actor.id);
                }
                return;
            });

            // SAVE RECOMMENDATIONS
            await db.tx(t => {
                let i = 0;
                for (const movie of recommendations) {
                    t.none("INSERT INTO movie_recommended (movie_id_1, movie_id_2, priority) VALUES ($1, $2, $3)", [internalMovieID, movie.movie_id, i]);
                    i++;
                }
                return;
            });

            // SAVE IMAGES
            // If the movie don't have a image, push one. All the movies need to have a image.
            if (images.backdrops.list.length === 0) {
                images.backdrops.list.push({
                    file_path: 'no_image',
                    active: true
                });
            }
            if (images.posters.list.length === 0) {
                images.posters.list.push({
                    file_path: 'no_image',
                    active: true
                })
            }
            if (images.logos.list.length === 0) {
                images.logos.list.push({
                    file_path: 'no_image',
                    active: true
                })
            }
            await db.tx(async t => {
                // TODO: This will push "no_name" to image even if it already exist. That is not needed
                for (let backdrop of images.backdrops.list) {
                    const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [backdrop.file_path], c => +c.id);
                    t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'BACKDROP')", [internalMovieID, imageId, backdrop.active]);
                }

                // TODO: This will push "no_name" to image even if it already exist. That is not needed.
                for (let poster of images.posters.list) {
                    const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [poster.file_path], c => +c.id);
                    t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'POSTER')", [internalMovieID, imageId, poster.active]);
                }

                // TODO: This will push "no_name" to image even if it already exist. That is not needed.
                for (let logo of images.logos.list) {
                    const imageId = await t.one("INSERT INTO image (path) VALUES($1) RETURNING id", [logo.file_path], c => +c.id);
                    t.none("INSERT INTO movie_image (movie_id, image_id, active, type) VALUES ($1, $2, $3, 'LOGO')", [internalMovieID, imageId, logo.active]);
                }
                return;
            });

            resolve();
        });
    }
}

module.exports = MovieMetadata;