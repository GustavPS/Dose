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
        let orderBy = req.query.orderby ? req.query.orderby : 'id';
        let offset = req.query.offset ? req.query.offset : '0';
        let limit = req.query.limit ? req.query.limit : '20';
        let token = req.query.token;
        let decoded = validateUser(token)

        if (!decoded) {
            res.status(403).end();
            resolve();
            return;
        }

        let user_id = decoded.user_id;
        if (!ORDERBY.includes(orderBy)) {
            res.status(400).end();
            resolve();
        } else {
            db.any(`
            SELECT i.movie_id AS id, i.title, i.overview, i.release_date, i.runtime, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images, 
            m.time AS watchtime, i.run_time AS runtime
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

            INNER JOIN user_movie_progress m
            ON i.movie_id = m.movie_id AND m.user_id = $1

            GROUP BY i.id, i.title, m.time
            ORDER BY ${orderBy}
            OFFSET $2
            LIMIT $3
            `, [user_id, offset, limit]).then(result => {
                let response = {
                result: result,
                next: `/api/movies/list?orderby=${orderBy}&limit=${limit}&offset=${parseInt(offset)+parseInt(limit)}`
                }
                res.status(200).json(response);
                resolve();
            });
        }
    });
}
  