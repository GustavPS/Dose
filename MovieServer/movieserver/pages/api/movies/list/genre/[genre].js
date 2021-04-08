const db = require('../../../../../lib/db');
const cors = require('../../../../../lib/cors');
const validateUser = require('../../../../../lib/validateUser');
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
    if (!validateUser(token)) {
        res.status(403).end();
        resolve();
        return;
    }
    //console.log(offset);

    if (!ORDERBY.includes(orderBy)) {
        res.status(400).end();
    } else {
        db.any(`
        SELECT * FROM (
          SELECT i.movie_id AS id, i.title, i.overview, i.release_date, i.runtime, i.popularity, i.added_date, i.trailer, array_agg(DISTINCT t.name) AS genres, json_agg(json_build_object('path', k.path, 'active', j.active, 'type', j.type)) AS images
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
          GROUP BY i.id, i.title
        ) c
        WHERE $1=ANY(c.genres)
        ORDER BY ${orderBy}
        OFFSET $2
        LIMIT $3
        `, [req.query.genre, offset, limit]).then(result => {
          let response = {
              result: result,
              nextOffset: parseInt(offset)+parseInt(limit),
              next: `/api/movies/list/${req.query.genre}?orderby=${orderBy}&limit=${limit}&offset=${parseInt(offset)+parseInt(limit)}`
          }
          res.status(200).json(response);
          resolve();
        });
      }
  });
}