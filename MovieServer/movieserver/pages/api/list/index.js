const db = require('../../../lib/db');
const cors = require('../../../lib/cors');

const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);
        db.any(`
        SELECT i.movie_id AS id, i.title, i.overview, json_agg(json_build_object('path', k.path, 'type', j.type)) AS images
        FROM movie_metadata i

        -- Join with movie_image and image to get an array of the movies images
        INNER JOIN movie_image j
        ON i.movie_id = j.movie_id
        INNER JOIN image k
        ON j.image_id = k.id

        WHERE j.active = true

        GROUP BY i.movie_id, i.title, i.overview
        `).then(result => {
            let response = {
                movies: result,
                series: []
            }
            res.status(200).json(response);
            resolve();
        });
    });
}
  