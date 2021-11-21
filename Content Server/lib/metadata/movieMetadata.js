const Metadata = require('./metadata');
const fetch = require('node-fetch');
const db = require('../db');
const Movie = require('../media/Movie');
const Logger = require('../logger');
const logger = new Logger().getInstance();


class MovieMetadata extends Metadata {
    constructor() {
        super();
    }

    /** PRIVATE FUNCTIONS **/

    /**
     * Search for the tmdb ID for a movie
     * 
     * @param {string} movieName The movie name
     * @param {int} year The release year for the movie (OPTIONAL)
     * @returns Promise
     */
     #searchForMovie(movieName, year=null) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/search/movie?api_key=${this.getAPIKey()}&language=en-US&query=${movieName}&year=${year}&page=1&include_adult=true`))
            .then(res => res.json())
            .then(json => {
                if (json.total_results == 0) {
                    reject("Not found");
                } else {
                    resolve(json.results[0].id);
                }
            });
        });
    }

    /**
     * Returns the metadata for a movie
     * 
     * @param {int} id The tmdb ID for a movie
     * @returns 
     */
    #searchForMetadata(id) {
        return new Promise(resolve => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${id}?api_key=${this.getAPIKey()}&language=en-US`))
            .then(res => res.json())
            .then(res => resolve(res));
        });
    }

    /** PUBLIC FUNCTIONS **/

    
    getType() {
        return "movie";
    }

    setDirectplayReady(movieID) {
        return new Promise(resolve => {
            db.tx(async t => {
                t.none("UPDATE movie_metadata SET directplay_ready = TRUE WHERE movie_id = $1", [movieID])
                .then(() => resolve());
            });
        });
    }

    getDirectplayHandlingNeeded() {
        return new Promise(resolve => {
            db.tx(async t => {
                t.any("SELECT title, movie_id, tmdb_id, directplay_ready FROM movie_metadata WHERE directplay_ready = FALSE")
                .then(movies => resolve(movies));
            });
        });
    }

    /**
     * Get a list of movies with bad images
     * 
     * @returns Promise
     */
    getBadImages() {
        return new Promise(resolve => {
            db.tx(async t => {
                t.any("SELECT title, movie_id, tmdb_id, found_good_poster, found_good_backdrop, found_good_logo FROM movie_metadata WHERE (found_good_poster = FALSE OR found_good_backdrop = FALSE OR found_good_logo = FALSE) AND tmdb_id != -1")
                .then(movies => resolve(movies));
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
            .then(images => {
                const movie = new Movie(movieId);

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

                const haveLogoP     = movie.haveLogoSaved();
                const havePosterP   = movie.havePosterSaved();
                const haveBackdropP = movie.haveBackdropSaved();
                
                Promise.all([haveLogoP, havePosterP, haveBackdropP])
                .then(([haveLogo, havePoster, haveBackdrop]) => {
                    let anythingUpdated = false;
                    
                    if (!haveLogo && images.logos.list.length > 0) {
                        logger.INFO(`No earlier logos saved for movie ${title}. Saving now`);
                        movie.insertImages(images.logos.list, 'LOGO');
                        anythingUpdated = true;
                    }
                    if (!havePoster && images.posters.list.length > 0) {
                        logger.INFO(`No earlier posters saved for movie ${title}. Saving now`);
                        movie.insertImages(images.posters.list, 'POSTER');
                        anythingUpdated = true;
                    }
                    if (!haveBackdrop && images.backdrops.list.length > 0) {
                        logger.INFO(`No earlier backdrops saved for movie ${title}. Saving now`);
                        movie.insertImages(images.posters.list, 'BACKDROP');
                        anythingUpdated = true;
                    }
    
                    if (haveLogo && needLogo && images.logos.foundPrefferedLanguage) {
                        logger.INFO(`Found better logo for movie ${title}. Saving now`);
                        movie.deleteImages('LOGO')
                        .then(() => movie.insertImages(images.logos.list, 'LOGO'));
                        anythingUpdated = true;
                    }
                    if (havePoster && needPoster && images.posters.foundPrefferedLanguage) {
                        logger.INFO(`Found better poster for movie ${title}. Saving now`);
                        movie.deleteImages('POSTER')
                        .then(() => movie.insertImages(images.posters.list, 'POSTER'));
                        anythingUpdated = true;
                    }
                    if (haveBackdrop && needBackdrop && images.backdrops.foundPrefferedLanguage) {
                        logger.INFO(`Found better backdrop for movie ${title}. Saving now`);
                        movie.deleteImages('BACKDROP')
                        .then(() => movie.insertImages(images.backdrops.list, 'BACKDROP'));
                        anythingUpdated = true;
                    }
                    movie.updateImageStatus(
                        images.posters.foundPrefferedLanguage,
                        images.backdrops.foundPrefferedLanguage,
                        images.logos.foundPrefferedLanguage);
    
    
                    if (!anythingUpdated) {
                        logger.INFO(`Didn't find any better images for movie ${title}. Still need: ${needBackdrop ? 'Backdrop ' : ''}${needPoster ? 'Poster ' : ''}${needLogo ? 'Logo ' : ''}`);
                    }
                });

                // DB updates might not be done yet, but the promise is only to
                // make sure that we don't flood the API with requests
                resolve();
            });
        });
    }

    /**
     * Find and set the preferred image
     * 
     * @param {string} language 
     * @param {Array} images 
     * @param {boolean} useLowestAspectRatio 
     * @returns Array
     */
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

    /**
     * Returns the complete metadata for a movie including:
     * metadata, images, actors, recommendations, trailer and year
     * 
     * @param {string} movieName 
     * @param {int} year 
     * @returns Promise
     */
    getMetadataByYear(movieName, year=null) {
        return new Promise((resolve, reject) => {
            this.#searchForMovie(movieName, year)
            .then(id => {
                const metadataPromise = this.#searchForMetadata(id);
                const actorsPromise = this.getActors(id);
                const recommendationsPromise = this.getRecommended(id);
                const imagesPromise = this.getImages(id);
                const trailerPromise = this.getTrailer(id);
                Promise.all([metadataPromise, actorsPromise, recommendationsPromise, imagesPromise, trailerPromise])
                .then(([metadata, actors, recommendations, images, trailer]) => {
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

                    const result = {
                        metadata: metadata,
                        images: images,
                        actors: actors,
                        recommendations: recommendations,
                        trailer: trailer,
                        year: year
                    }
                    resolve(result);
                });
            })
            .catch(err => {
                reject(err);
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
     * @param {int} tmdbID TMDB id for the movie
     * @returns 
     */
    getImages(tmdbID) {
        return new Promise(resolve => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${tmdbID}/images?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null`))
            .then(res => res.json())
            .then(images => {
                resolve(images);
            })
        });
    }
    
    /**
     * Get a list of actors for a movie
     * 
     * @param {string} tmdbId  TMDB id for the movie
     * @returns 
     */
    getActors(tmdbId) {
        return new Promise(resolve => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${tmdbId}/credits?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null`))
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

    /**
     * Get the recommended movies for a movie
     * 
     * @param {string} tmdbID 
     * @returns 
     */
    getRecommended(tmdbID) {
        return new Promise(async (resolve, reject) => {
            const request = (page, list=[], count=0) => {
                return new Promise((resolve) => {
                    fetch(encodeURI(`${this.getAPIUrl()}/movie/${tmdbID}/recommendations?api_key=${this.getAPIKey()}&language=en-US&include_image_language=en,null&page=${page}`))
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


    /**
     * Get a list of internalMovieIds by a list of tmdbIds
     * 
     * @param {Array} IDs The list of TMDB IDs
     * @returns Array
     */
    getMoviesByTmdbIds(IDs) {
        return new Promise(async (resolve) => {
            const result = await db.any("SELECT movie_id, tmdb_id FROM movie_metadata WHERE tmdb_id = ANY ($1)", [IDs]);
            resolve(result);
        });
    }

    /**
     * Get a list of popular movies (Max 60)
     * 
     * @returns Promise
     */
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

    /**
     * Update the popular movies
     * 
     * @param {Array} movies The list of movies
     * @returns Promise
     */
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

    /**
     * Get the trailer path for a movie
     * 
     * @param {int} tmdbID The TMDB ID for a moive
     * @returns Promise
     */
    getTrailer(tmdbID) {
        return new Promise((resolve, reject) => {
            fetch(encodeURI(`${this.getAPIUrl()}/movie/${tmdbID}/videos?api_key=${this.getAPIKey()}`))
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
     * Insert all metadata for a movie
     * 
     * @param {json} metadata The metadata object
     * @param {json} images JSON object containing all images
     * @param {array} actors The list of actors
     * @param {array} recommendations The list of recommendations
     * @param {string} trailer The trailer path
     * @param {int} internalMovieID The internal movie ID
     * @returns Promise
     */
    insertMetadata(metadata, images, actors, recommendations, trailer, internalMovieID) {
        return new Promise((resolve, reject) => {
            const movie = new Movie(internalMovieID);
            
            if (metadata.genres.length === 0)
                metadata.genres.push(this.getDummyGenre());
            if (actors.length === 0)
                actors.push(this.getDummyActor());
            if (images.backdrops.list.length === 0)
                images.backdrops.list.push(this.getDummyImage());
            if (images.posters.list.length === 0)
                images.posters.list.push(this.getDummyImage())
            if (images.logos.list.length === 0)
                images.logos.list.push(this.getDummyImage())

            db.tx(t => {
                let queries = [];
                queries.push(movie.addMovieGenres(metadata.genres, t));
                queries.push(movie.insertMetadata(metadata.title, metadata.overview, metadata.poster_path, metadata.release_date,
                    metadata.runtime, metadata.popularity, metadata.backdrop_path, trailer, metadata.id,
                    images.posters.foundPrefferedLanguage, images.backdrops.foundPrefferedLanguage, images.logos.foundPrefferedLanguage, t));
                queries.push(movie.addMovieActors(actors, t));
                queries.push(movie.addRecommendations(recommendations, t));
                queries.push(movie.insertImages(images.backdrops.list, 'BACKDROP', t));
                queries.push(movie.insertImages(images.posters.list, 'POSTER', t));
                queries.push(movie.insertImages(images.logos.list, 'LOGO', t));
                return t.batch(queries);
            })
            .then(() => resolve())
            .catch(err => {
                logger.ERROR('Error inserting metadata. Check next line for full information');
                logger.ERROR(err);
                reject();
            });
        });
    }
}

module.exports = MovieMetadata;