import validateServerAccess from './validateServerAccess';

export default class ContentServer {
    // The server
    #server;
    // The IP
    #ip;

    constructor(server) {
        this.#server = server;
        this.#ip = server.server_ip;
    }

    getActiveLogo(images) {
        for (let image of images) {
            if (image.type === 'LOGO' && image.active && image.path != "no_image") {
                return image;
            }
        }
        return false;
    }

    getActiveImages(images) {
        const result = {
            backdrop: null,
            poster: null
        }

        for (let image of images) {
            if (image.active) {
                if (image.type === 'BACKDROP') {
                    if (image.path === 'no_image') {
                        result.backdrop = null;
                    } else {
                        result.backdrop = image.path;
                    }
                } else {
                    if (image.path === 'no_image') {
                        result.poster = null;
                    } else {
                        result.poster = image.path;
                    }
                }

                if (result.backdrop != null && result.poster != null) {
                    break;
                }
            }
        }
        return result;
    }

    #request(url, options) {
        return new Promise(resolve => {
            fetch(url, options).then(r => r.json()).then(response => {
                response.result.forEach(item => {
                    const images = this.getActiveImages(item.images);
                    item.backdrop = images.backdrop;
                    item.poster = images.poster;
                });
                resolve(response.result);
            });
        });
    }

    getStandardPostOptions(limit) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                limit: limit
            })
        }
    }

    getPopularMovies(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/movies/list/popular?orderby=release_date&limit=${limit}&token=${token}`
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getOngoingMovies(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/movies/list/ongoing?orderby=release_date&limit=${limit}&token=${token}`;
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getWatchlist(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/movies/list/watchlist?orderby=release_date&limit=${limit}&token=${token}`
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getNewlyAddedMovies(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/movies/list?orderby=added_date&limit=${limit}&token=${token}`;
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getNewlyAddedShows(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/series/list?orderby=added_date&limit=${limit}&token=${token}`
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getNewlyAddedEpisodes(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/series/list/episodes?orderby=added_date&limit=${limit}&token=${token}`;
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getRandomTrailer() {
        return new Promise((resolve, reject) => {
            validateServerAccess(this.#server, (token) => {
                // Get recommended video (random video right now)
                const url = `${this.#ip}/api/movies/list/random?trailer=true&token=${token}`
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((r) => r.json()).then(result => {
                    if (result.status === 'success') {
                        result.movie.activeLogo = this.getActiveLogo(result.movie.images);
                        resolve(result.movie);
                    } else {
                        reject("Error getting recommended movie");
                    }
                })
            });
        });
    }

    getOngoingShows(limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/series/list/ongoing?orderby=added_date&limit=${limit}&token=${token}`;
                const options = this.getStandardPostOptions(limit);

                fetch(url, options).then(r => r.json()).then(response => {
                    response.upcoming.forEach(movie => {
                        const images = this.getActiveImages(movie.images);
                        movie.backdrop = images.backdrop;
                        movie.poster = images.poster;
                    });
                    response.ongoing.forEach(movie => {
                        const images = this.getActiveImages(movie.images);
                        movie.backdrop = images.backdrop;
                        movie.poster = images.poster;
                    });
                    resolve(response);
                });
            });
        });
    }

    getAllGenres() {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/genre/list?token=${token}`;
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => r.json()).then(result => {
                    resolve(result.genres);
                });
            });
        });
    }

    getMoviesByGenre(genre, limit = 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/movies/list/genre/${genre}?orderby=added_date&limit=${limit}&token=${token}`;
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }

    getShowsByGenre(genre, limit= 20) {
        return new Promise(resolve => {
            validateServerAccess(this.#server, (token) => {
                const url = `${this.#ip}/api/series/list/genre/${genre}?orderby=added_date&limit=${limit}&token=${token}`;
                resolve(this.#request(url, this.getStandardPostOptions(limit)));
            });
        });
    }
}