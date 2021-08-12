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
        SELECT i.movie_id AS id, i.title, i.overview, json_agg(json_build_object('path', k.path, 'type', j.type, 'active', j.active)) AS images
        FROM movie_metadata i

        -- Join with movie_image and image to get an array of the movies images
        INNER JOIN movie_image j
        ON i.movie_id = j.movie_id
        INNER JOIN image k
        ON j.image_id = k.id AND j.active = true

        INNER JOIN movie_recommended l
        ON l.movie_id_1 = i.movie_id OR l.movie_id_2 = i.movie_id


        WHERE i.movie_id IN (
                SELECT movie_id_1 FROM movie_recommended WHERE movie_id_2 = $1
                UNION ALL
                SELECT movie_id_2 FROM movie_recommended WHERE movie_id_1 = $1
            )
        GROUP BY i.movie_id, i.title, i.overview
        `, [movieID]).then(movies => {
            response.success = true;
            response.movies = movies;
            res.status(200).json(response);
        });
    });
}
  