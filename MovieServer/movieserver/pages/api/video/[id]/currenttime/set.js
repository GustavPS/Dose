const db = require('../../../../../lib/db');
const cors = require('../../../../../lib/cors');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');
const jwtSecret = 'SERVERSECRET';
const jwt = require('jsonwebtoken');


export default (req, res) => {
    return new Promise((resolve) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
    
        // TODO: Error handling
        let movie_id = req.query.id;
        // TODO: FELHANTERING
        let time = Math.floor(parseInt(req.query.time));
        let videoDuration = Math.floor(parseInt(req.query.videoDuration));
        let token = req.query.token;
    
    
    
        let decoded;
        if (token === undefined || token === null) {
            res.status(403).end();
            resolve();
            return;
        }
    
        try {
            decoded = jwt.verify(token, jwtSecret);
        } catch (e) {
            console.log("Kunde inte verifiera token i setCurrentTime (gammal token?)");
        }
    
        if (decoded) {
            let user_id = decoded.user_id;
            // Update the runtime that we got from the metadata with the real runtime.
            db.none('UPDATE movie_metadata SET run_time = $1 WHERE movie_id = $2', [videoDuration, movie_id])
            .then(() => {
            // Get the runtime from the movie
                db.any('SELECT run_time FROM movie_metadata WHERE movie_id = $1', [movie_id])
                .then(result => {
                    if (result.length > 0) {
                        // If the user only has less than 5 minutes left of the movie, remove the movie_progress entry.
                        if (time >= result[0].run_time - 300) {
                            db.none('DELETE FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id]);
                            res.status(200).end();
                            resolve();
    
                        } else {
                            db.any('SELECT * FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id])
                            .then(result => {
                                if (result.length === 0) {
                                    db.none('INSERT INTO user_movie_progress (user_id, movie_id, time) VALUES ($1, $2, $3)', [user_id, movie_id, time]);
                                } else {
                                    db.none('UPDATE user_movie_progress SET time = $1 WHERE user_id = $2 AND movie_id = $3', [time, user_id, movie_id]);
                                }
                            })
                            res.status(200).end();
                            resolve();
                        }
                    }
                });
            })

        } else {
            console.log("Decoded var false i setCurrentTime");
            res.status(403).end();
            resolve();
        }
    });

    
    //db.any('SELECT * FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [])

}