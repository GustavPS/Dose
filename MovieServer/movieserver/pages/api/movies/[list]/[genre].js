const db = require('../../../../lib/db');


export default (req, res) => {
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
    `, [req.query.genre]).then(result => {
      //db.any('SELECT name FROM category WHERE imdb_category_id IN (SELECT category_id FROM movie_category)')
      console.log(result);
      res.status(200).json(result);
    });
  }
  