const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

const ORDERBY = [
  'added_date',
  'air_date',
  'vote_average'
];

export default (req, res) => {
  return new Promise(resolve => {
      res = cors(res);
      let orderBy = req.query.orderby ? req.query.orderby : 'added_date';
      let offset = req.query.offset ? req.query.offset : '0';
      let limit = req.query.limit ? req.query.limit : '20';

      let token = req.query.token;
      
      if (!validateUser(token)) {
          res.status(403).end();
          resolve();
          return;
      }
      


      // k.path || ' ' || j.active
      if (!ORDERBY.includes(orderBy)) {
          res.status(400).end();
      } else {
          db.any(`
          SELECT i.serie_id AS serie_id, i.season_number AS season, i.episode_number AS episode, n.id AS internalEpisodeID, i.name AS title, i.air_date AS first_air_date, i.added_date, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images
          FROM serie_episode_metadata i

          -- Join with serie_image and image to get an array of the movies images
          INNER JOIN serie_image j
          ON i.serie_id = j.serie_id
          INNER JOIN image k
          ON j.image_id = k.id AND j.active = true

          -- Join with serie_episode to get the internalEpisodeId
          INNER JOIN serie_episode n
          ON i.serie_id = n.serie_id AND i.season_number = n.season_number AND i.episode_number = n.episode

          GROUP BY i.serie_id, i.season_number, i.episode_number, i.added_date, n.id
          ORDER BY ${orderBy} DESC
          OFFSET $1
          LIMIT $2
          `, [offset, limit]).then(result => {
            let response = {
              result: result,
              next: `/api/series/list/episodes?orderby=${orderBy}&limit=${limit}&offset=${parseInt(offset)+parseInt(limit)}`
            }
            res.status(200).json(response);
            resolve();
          });
    }
  });
}
  