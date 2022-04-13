const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const validateUser = require('../../../lib/validateUser');

const Search = (req, res) => {
    return new Promise(resolve => {
        res = cors(res);

        let query = req.query.query;
        let token = req.query.token;

        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let response = {
            movies: [],
            series: []
        }

        db.any(`
         SELECT i.movie_id AS id, i.title, i.overview, i.release_date, i.runtime, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images
         FROM movie_metadata i
          
         -- Join with movie_category and category to get an array of the categories
         INNER JOIN movie_category it
         ON it.movie_id = i.movie_id
         INNER JOIN category t
         ON t.imdb_category_id = it.category_id

        -- Join with movie_image and image to get an array of the movies images
        INNER JOIN movie_image j
        ON i.movie_id = j.movie_id
        INNER JOIN image k
        ON j.image_id = k.id AND j.active = true

        WHERE i.title ILIKE $1
        GROUP BY i.movie_id, i.title, i.overview, i.release_date, i.runtime, i.popularity, i.added_date, i.trailer
        `, [`%${query}%`]).then(movies => {
            response.movies = movies;
            db.any(`
            SELECT i.serie_id AS id, i.title, i.overview, i.first_air_date, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images
            FROM serie_metadata i
            
            -- Join with serie_category and category to get an array of the categories
            INNER JOIN serie_category it
            ON it.serie_id = i.serie_id
            INNER JOIN category t
            ON t.imdb_category_id = it.category_id


            INNER JOIN serie_image j
            ON i.serie_id = j.serie_id
            INNER JOIN image k
            on j.image_id = k.id AND j.active = true

            WHERE i.title ILIKE $1
            GROUP BY i.serie_id, i.title, i.overview, i.first_air_date, i.popularity, i.added_date, i.trailer
            `, [`%${query}%`]).then(series => {
                response.series = series;
                res.status(200).json(response);
                resolve();
            })
        });
    });
}

export default Search;