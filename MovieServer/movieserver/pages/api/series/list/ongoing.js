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
        let decoded = validateUser(token);
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
            SELECT DISTINCT ON (n.id, p.last_watched) i.name, i.air_date, i.overview, i.vote_average, i.added_date, i.air_date, n.id AS internalEpisodeID, p.time AS time_watched, i.run_time AS total_time, j.name AS season_name, i.episode_number AS episode_number,
            j.season_id AS season_number, n.serie_id AS show_id, p.last_watched,
            jsonb_agg(DISTINCT jsonb_build_object('path', m.path, 'active', k.active, 'type', k.type)) AS images
            FROM serie_episode_metadata i

            INNER JOIN serie_season_metadata j
            ON j.serie_id = i.serie_id AND j.season_id = i.season_number

            -- Join with serie_image
            INNER JOIN serie_image k
            ON i.serie_id = k.serie_id
            INNER JOIN image m
            ON k.image_id = m.id AND k.active = true

            INNER JOIN serie_episode n
            ON i.serie_id = n.serie_id AND i.season_number = n.season_number AND i.episode_number = n.episode

            INNER JOIN user_episode_progress p
            ON p.user_id = $1 AND p.episode_id = n.id

            GROUP BY i.name, i.air_date, i.overview, i.vote_average, i.added_date, i.air_date, n.id, p.time, i.run_time, j.name, i.episode_number, j.season_id, n.serie_id, p.last_watched
            ORDER BY p.last_watched DESC
            `, [user_id]).then(result => {
                let response = {
                    ongoing: result
                }

                db.any(`
                SELECT DISTINCT ON (p.episode_id, p.last_watched) i.name, i.air_date, i.overview, i.vote_average, i.added_date, i.air_date, p.episode_id AS internalEpisodeID, i.episode_number AS episode_number, j.name AS season_name,
                j.season_id AS season_number, n.serie_id AS show_id, p.last_watched,
                jsonb_agg(DISTINCT jsonb_build_object('path', m.path, 'active', k.active, 'type', k.type)) AS images
                FROM user_next_episode p

                INNER JOIN serie_episode n
                ON n.id = p.episode_id

                INNER JOIN serie_episode_metadata i
                ON n.episode = i.episode_number AND n.season_number = i.season_number AND n.serie_id = i.serie_id
    
                INNER JOIN serie_season_metadata j
                ON j.serie_id = i.serie_id AND j.season_id = i.season_number
    
                -- Join with serie_image
                INNER JOIN serie_image k
                ON i.serie_id = k.serie_id
                INNER JOIN image m
                ON k.image_id = m.id
    
                WHERE p.user_id = $1 AND p.serie_id = n.serie_id

                GROUP BY i.name, i.air_date, i.overview, i.vote_average, i.added_date, i.air_date, n.id, p.episode_id, j.name, i.episode_number, j.season_id, n.serie_id, p.last_watched
                ORDER BY p.last_watched DESC
                `, [user_id]).then(result => {
                    response.upcoming = result;
                    res.status(200).json(response);
                    resolve();
                });
            });
        }
    });
}
  