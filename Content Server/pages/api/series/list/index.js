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
        /*

        const user = validateUser(token);
        if (!user) {
            res.status(403).end();
            resolve();
            return;
        }*/
        const user = {
            user_id: 1,
        }

        // k.path || ' ' || j.active
        if (!ORDERBY.includes(orderBy)) {
            res.status(400).end();
        } else {
            db.any(`
          SELECT i.serie_id AS id, i.title, i.overview, i.first_air_date, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images
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
          ON j.image_id = k.id AND j.active = true

          GROUP BY i.id, i.title
          ORDER BY ${orderBy} DESC
          OFFSET $1
          LIMIT $2
          `, [offset, limit]).then(async (result) => {
                for (let i = 0; i < result.length; i++) {
                    const serie = result[i];
                    const nextEpisode = await db.any(`
                        SELECT episode_id, season_number, episode FROM user_next_episode

                        INNER JOIN serie_episode e
                        ON e.id = user_next_episode.episode_id AND e.serie_id = $1
                        
                        WHERE user_id = $2
                    `, [serie.id, user.user_id]);
                    const episodeProgress = await db.any(`
                        SELECT episode_id, time, season_number, episode FROM user_episode_progress

                        INNER JOIN serie_episode e
                        ON e.id = user_episode_progress.episode_id AND e.serie_id = $1
                        
                        WHERE user_id = $2
                    `, [serie.id, user.user_id]);
                    console.log(user.user_id);
                    console.log(serie.id);
                    console.log(episodeProgress)
                    result[i].nextEpisodeForUser = nextEpisode.length > 0 ? nextEpisode[0] : null;
                    result[i].episodeProgress = episodeProgress.length > 0 ? episodeProgress[0] : null;
                }


                let response = {
                    result: result,
                    next: `/api/movies/list?orderby=${orderBy}&limit=${limit}&offset=${parseInt(offset) + parseInt(limit)}`
                }
                res.status(200).json(response);
                resolve();
            });
        }
    });
}
