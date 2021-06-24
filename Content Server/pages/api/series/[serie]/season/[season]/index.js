const db = require('../../../../../../lib/db');
const cors = require('../../../../../../lib/cors');
const validateUser = require('../../../../../../lib/validateUser');
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
        let seasonID = req.query.season;

        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        db.one(`
        SELECT i.name, i.air_date, i.overview, i.poster_path, i.added_date,
        jsonb_agg(DISTINCT jsonb_build_object('episode', j.episode_number, 'name', j.name, 'overview', j.overview, 'backdrop', j.image_path, 'vote_average', j.vote_average, 'internalID', p.id)) AS episodes,
        jsonb_agg(DISTINCT jsonb_build_object('path', m.path, 'active', k.active, 'type', k.type)) AS images

        FROM serie_season_metadata i

        INNER JOIN serie_episode_metadata j
        ON j.serie_id = i.serie_id AND j.season_number = $1
        
        INNER JOIN serie_episode p
        ON p.serie_id = i.serie_id AND p.season_number = j.season_number AND p.episode = j.episode_number

        -- Join with serie_image and image to get an array of the movies images
        INNER JOIN serie_image k
        ON i.serie_id = k.serie_id
        INNER JOIN image m
        ON k.image_id = m.id


        WHERE i.serie_id = $2 AND i.season_id = $3

        GROUP BY i.name, i.air_date, i.overview, i.poster_path, i.added_date

        `, [seasonID, serieID, seasonID]).then(result => {
            result.episodes.sort((a, b) => parseFloat(a.episode) - parseFloat(b.episode));
            let response = {
                result: result
            }
            res.status(200).json(response);
            resolve();
        });
  });
}
  