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
        let serieID = req.query.serie;

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        db.one(`
        SELECT i.serie_id AS id, i.title, i.overview, i.first_air_date, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, jsonb_agg(DISTINCT jsonb_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images,
        jsonb_agg(DISTINCT jsonb_build_object('name', m.name, 'season_id', m.season_id, 'poster_path', m.poster_path)) AS seasons
        FROM serie_metadata i

        -- Join with serie_category and category to get an array of the categories
        INNER JOIN serie_category it
        ON it.serie_id = i.serie_id
        INNER JOIN category t
        ON t.imdb_category_id = it.category_id

        -- Join with serie_image and image to get an array of the movies images
        INNER JOIN serie_image j
        ON i.serie_id = j.serie_id
        INNER JOIN image k
        ON j.image_id = k.id

        INNER JOIN serie_season_metadata m
        ON m.serie_id = i.serie_id

        WHERE it.serie_id = $1

        GROUP BY i.serie_id, i.title, i.overview, i.first_air_date, i.popularity, i.added_date, i.trailer

        `, [serieID]).then(result => {
            result.seasons.sort((a, b) => parseInt(a.season_id) - parseInt(b.season_id));
            let response = {
                result: result
            }
            res.status(200).json(response);
            resolve();
        });
  });
}
  