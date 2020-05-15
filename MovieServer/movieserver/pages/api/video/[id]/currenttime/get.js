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
            console.log("Kunde inte verifiera token i getCurrentTime (gammal token?)");
        }
    
        if (decoded) {
            let user_id = decoded.user_id;
            db.one('SELECT time FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id])
            .then(result => {
                res.status(200).json({
                    time: result.time
                });
                resolve();
            })
            .catch(err => {
                res.status(200).json({
                    time: 0
                });
                resolve();
            });
        } else {
            console.log("Decoded var false i getCurrentTime");
            res.status(403).end();
            resolve();
        }
    });


}
