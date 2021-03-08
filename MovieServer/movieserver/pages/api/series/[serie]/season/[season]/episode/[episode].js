const db = require('../../../../../../../lib/db');
const cors = require('../../../../../../../lib/cors');
const validateUser = require('../../../../../../../lib/validateUser');

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
        let episodeID = req.query.episode;

        let decoded = validateUser(token);
        if (!decoded) {
            res.status(403).end();
            resolve();
            return;
        }

        let user_id = decoded.user_id;
        db.one(`
        SELECT i.name, o.name AS show_name, i.air_date, i.overview, i.vote_average, i.added_date, i.air_date, j.poster_path AS season_poster, n.id AS internalEpisodeID,
        jsonb_agg(DISTINCT jsonb_build_object('path', m.path, 'active', k.active, 'type', k.type)) AS images
        FROM serie_episode_metadata i

        INNER JOIN serie_season_metadata j
        ON j.serie_id = i.serie_id AND j.season_id = $1

        -- Join with serie_image
        INNER JOIN serie_image k
        ON i.serie_id = k.serie_id
        INNER JOIN image m
        ON k.image_id = m.id

        INNER JOIN serie_episode n
        ON i.serie_id = n.serie_id AND i.season_number = n.season_number AND i.episode_number = n.episode

        INNER JOIN serie o
        ON n.serie_id = o.id


        WHERE i.serie_id = $2 AND i.season_number = $3 AND i.episode_number = $4

        GROUP BY i.name, i.air_date, i.overview, i.vote_average, i.added_date, j.poster_path, n.id, o.name

        `, [seasonID, serieID, seasonID, episodeID]).then(result => {
            db.any('SELECT time FROM user_episode_progress WHERE user_id = $1 AND episode_id = $2', [user_id, result.internalepisodeid]).then(progress => {
                let response = {
                    result: result
                }
                if (progress.length > 0) {
                    response.result.currentTime = progress[0].time;
                }

                res.status(200).json(response);
                resolve();
            });
        });
  });
}
  