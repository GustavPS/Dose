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
        let content_id = req.query.id;
        let token = req.query.token;
        let type = req.query.type;

    
    
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
            if (type === 'movie') {
                getProgressFromMovie(user_id, content_id).then(time => {
                    res.status(200).json({
                        time: time
                    });
                });
            } else if(type === 'serie') {
                getProgressFromEpisode(user_id, content_id).then(time => {
                    res.status(200).json({
                        time: time
                    })
                });
            } else {
                res.status(404).end();
            }


        } else {
            console.log("Decoded var false i getCurrentTime");
            res.status(403).end();
            resolve();
        }
    });
}


function getProgressFromMovie(user_id, movie_id) {
    return new Promise(resolve => {
        db.one('SELECT time FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id])
        .then(result => {
            resolve(result.time);
        })
        .catch(err => {
            resolve(0);
        });
    });
}

function getProgressFromEpisode(user_id, episode_id) {
    return new Promise(resolve => {
        db.one('SELECT time FROM user_episode_progress WHERE user_id = $1 AND episode_id = $2', [user_id, episode_id])
        .then(result => {
            resolve(result.time);
        })
        .catch(err => {
            resolve(0);
        })
    });
}