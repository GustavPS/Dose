const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);

        let token = req.query.token;
        let movieID = req.query.movie;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let response = {
            success: false,
            movies: [],
        }

        db.any(`
        SELECT * FROM movie_recommended WHERE movie_id_1 = $1 OR movie_id_2 = $1
        `, [movieID]).then(recommendedInfo => {

            let moviesToGet = [];
            for (const movieInfo of recommendedInfo) {
                if (movieInfo.movie_id_1 != movieID) {
                    moviesToGet.push(movieInfo.movie_id_1);
                } else {
                    moviesToGet.push(movieInfo.movie_id_2);
                }
            }

            db.any(`
            SELECT i.movie_id AS id, i.title, i.overview, json_agg(json_build_object('path', k.path, 'type', j.type, 'active', j.active)) AS images
            FROM movie_metadata i
    
            -- Join with movie_image and image to get an array of the movies images
            INNER JOIN movie_image j
            ON i.movie_id = j.movie_id
            INNER JOIN image k
            ON j.image_id = k.id AND j.active = true
    
    
            WHERE i.movie_id = ANY($1)
            GROUP BY i.movie_id, i.title, i.overview
            `,[moviesToGet]).then(result => {
                let orderedResult = [];
                for (const recommended of recommendedInfo) {
                    const searchValue = recommended.movie_id_1 == movieID ? recommended.movie_id_2 : recommended.movie_id_1;
                    for (const movie of result) {
                        if (movie.id === searchValue) {
                            movie.priority = recommended.priority;
                            orderedResult.push(movie);
                            break;
                        }
                    }
                }
                orderedResult = orderedResult.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));
                response.success = true;
                response.movies = orderedResult;
                res.status(200).json(response);
            });
        });
/*
        db.any(`
        SELECT i.movie_id AS id, i.title, i.overview, json_agg(json_build_object('path', k.path, 'type', j.type, 'active', j.active)) AS images
        FROM movie_metadata i

        -- Join with movie_image and image to get an array of the movies images
        INNER JOIN movie_image j
        ON i.movie_id = j.movie_id
        INNER JOIN image k
        ON j.image_id = k.id AND j.active = true



        WHERE i.movie_id IN (
                SELECT movie_id_1 FROM movie_recommended WHERE movie_id_2 = $1
                UNION ALL
                SELECT movie_id_2 FROM movie_recommended WHERE movie_id_1 = $1
            )
        GROUP BY i.movie_id, i.title, i.overview
        `, [movieID]).then(movies => {
            response.success = true;
            response.movies = movies.sort((a, b) => parseFloat(a.priority) - parseFloat(b.priority));
            res.status(200).json(response);
        });
    */

    });
}
  