import validateServerAccess from './validateServerAccess';

function getMoviesByGenre(server, genre, offset, limit) {
    return new Promise((resolve, reject) => {
        validateServerAccess(server, (serverToken) => {
            let url = `${server.server_ip}/api/movies/list/genre/${genre}?orderby=added_date&offset=${offset}&limit=${limit}&token=${serverToken}`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: limit
                })
            })
                .then((r) => r.json())
                .then((response) => {
                    // Mark the movies active image
                    response.result.forEach(movie => {
                        for (let image of movie.images) {
                            if (image.active) {
                                if (image.type === 'BACKDROP') {
                                    if (image.path === 'no_image') {
                                        movie.backdrop = null;
                                    } else {
                                        movie.backdrop = image.path;
                                    }
                                } else {
                                    if (image.path === 'no_image') {
                                        movie.backdrop = null;
                                    } else {
                                        movie.poster = image.path;
                                    }
                                }

                                if (movie.backdrop != null && movie.poster != null) {
                                    break;
                                }
                            }
                        }
                    });
                    response.movies = response.result;
                    response.result = undefined;
                    resolve(response);
                });
        });
    });
}

export default getMoviesByGenre;