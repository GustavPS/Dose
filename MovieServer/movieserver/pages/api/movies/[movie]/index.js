const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const jwtSecret = 'SERVERSECRET';
const jwt = require('jsonwebtoken');

const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];

export default (req, res) => {
  return new Promise(resolve => {
        res = cors(res);
        let movieID = req.query.movie;
        let token = req.query.token;


        let decoded;
        if (token === undefined || token === null) {
            res.status(403).end();
            resolve();
            return;
        }

        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (e) {
            console.log("Kunde inte verifiera token i movies/[movie] (gammal token?)");
        }

        if (decoded) {
            let user_id = decoded.user_id;
            db.one(`
            SELECT i.movie_id AS id, i.title, i.overview, i.release_date, i.runtime, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images,
            m.movie_id AS watched
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
            ON j.image_id = k.id

            LEFT JOIN user_movie_watched m
            ON m.user_id = $1 AND m.movie_id = i.movie_id


            WHERE i.movie_id = $2

            GROUP BY i.id, i.title, m.movie_id
            `, [user_id, movieID]).then(result => {
                result.watched = result.watched !== null
                db.any('SELECT time FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movieID]).then(progress => {
                    let response = {
                        result: result
                    }
                    if (progress.length > 0) {
                        response.result.currentTime = progress[0].time;
                    }
                    res.status(200).json(response);
                    resolve();
                });

            }).catch(error => {
                console.log(` > User tried to get the information for movie with id ${req.query.movie} which does not exist`);
                res.status(404).end();
                resolve();
                return;
            });
        } else {
            res.status(403).end();
            resolve();
        }
  });
}
  