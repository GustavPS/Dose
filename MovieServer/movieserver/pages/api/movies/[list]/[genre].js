const db = require('../../../../lib/db');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];

export default (req, res) => {
  let orderBy = req.query.orderby ? req.query.orderby : 'id';
  let offset = req.query.offset ? req.query.offset : '0';
  let limit = req.query.limit ? req.query.limit : '20';
  //console.log(offset);

  if (!ORDERBY.includes(orderBy)) {
      res.status(400).end();
  } else {
      db.any(`
      SELECT * FROM (SELECT i.id, i.title, i.overview, i.poster, i.release_date, i.runtime, i.popularity, i.backdrop, i.added_date, array_agg(t.name) AS genres
      FROM movie_metadata i
      INNER JOIN movie_category it
      ON it.movie_id = i.movie_id
      INNER JOIN category t
      ON t.imdb_category_id = it.category_id
      GROUP BY i.id, i.title
      ) c
      WHERE $1=ANY(c.genres)
      ORDER BY ${orderBy}
      OFFSET $2
      LIMIT $3
      `, [req.query.genre, offset, limit]).then(result => {
        let response = {
          result: result,
          next: `/api/movies/list/${req.query.genre}?orderby=${orderBy}&limit=${limit}&offset=${parseInt(offset)+parseInt(limit)}`
        }
        console.log(response);
        res.status(200).json(response);
      });
    }
}