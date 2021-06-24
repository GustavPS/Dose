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
        let movieID = req.query.movie;
        let token = req.query.token;
        let setAsWatched = req.query.watched;
        let decoded = validateUser(token)

        if (!decoded) {
            res.status(403).end();
            resolve();
            return;
        }

        let user_id = decoded.user_id;
        if (setAsWatched) {
            db.none(`DELETE FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2`, [user_id, movieID]);
            db.none('INSERT INTO user_movie_watched (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO nothing', [user_id, movieID]);
        } else {
            db.none('DELETE FROM user_movie_watched (user_id, movie_id) VALUES ($1, $2)', [user_id, movieID]);
        }

        res.status(200).json({
            success: true
        });
        resolve();
  });
}
  