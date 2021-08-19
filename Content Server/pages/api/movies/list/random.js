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
  return new Promise(async (resolve) => {
      res = cors(res);
      let token = req.query.token;
      const needTrailer = req.query.trailer == "true";
      if (!validateUser(token)) {
          res.status(403).end();
          resolve();
          return;
      }

      let movies;
      if(needTrailer) {
        movies = await db.any('SELECT id FROM movie WHERE (trailer <> $1) IS TRUE', ["''"]);
      } else {
        movies = await db.any("SELECT id FROM movie");
      }
      console.log(movies);
      if (movies.length === 0) {
        const response = {
            status: 'fail'
        }
        res.status(200).json(response);
        return;
      }

      const id = Math.floor(Math.random() * (movies.length - 1));
      const movieId = parseInt(movies[id].id);
      db.one(`
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
        ON j.image_id = k.id AND j.active = true

        INNER JOIN movie l
        ON i.movie_id = l.id

        WHERE i.movie_id = $1
        GROUP BY i.id, i.title
        LIMIT 1
      `, [movieId]).then(result => {
          const response = {
              status: 'success',
              movie: result
          }
          res.status(200).json(response);
          resolve();
      })
      .catch(err => {
          console.log(err);
          const response = {
              status: 'fail'
          }
          res.status(200).json(response);
    })
  });
}
  