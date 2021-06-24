const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

export default (req, res) => {
  return new Promise(resolve => {
        res = cors(res);
        let movieID = req.query.movie;
        let token = req.query.token;
        let goingToAdd = req.query.add;
        let decoded = validateUser(token)

        if (!decoded) {
            res.status(403).end();
            resolve();
            return;
        }
        console.log("called addtowatch with " + goingToAdd)
        let user_id = decoded.user_id;
        if (goingToAdd == "true") {
            console.log("Adding from user_movie_watchlist: user_id = " + user_id + " and movie_id = " + movieID)

            db.none('INSERT INTO user_movie_watchlist (user_id, movie_id) VALUES ($1, $2) ON CONFLICT DO nothing', [user_id, movieID]);
        } else {
            console.log("DELETING from user_movie_watchlist: user_id = " + user_id + " and movie_id = " + movieID)
            db.none('DELETE FROM user_movie_watchlist WHERE user_id = $1 AND movie_id = $2', [user_id, movieID]);
        }

        res.status(200).json({
            success: true
        });
        resolve();
  });
}
  