const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const validateUser = require('../../../lib/validateUser');
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
        let serie_id = parseInt(req.query.serie_id);
        let season_number = parseInt(req.query.season);
        let episode_number = parseInt(req.query.episode);
        let token = req.query.token;

        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }
        getNextEpisodeID(episode_number, serie_id, season_number).then(episodeInfo => {
            res.status(200).json(episodeInfo);
            resolve();
        });
    });
}








function getNextEpisodeID(episodeNumber, serie_id, season_number) {
    return new Promise((resolve, reject) => {
        db.any('SELECT id, season_number, episode FROM serie_episode WHERE serie_id = $1 AND season_number = $2 AND episode = $3', [serie_id, season_number, episodeNumber+1]).then(result => {
            // If this was the last episode in the show, try to find the first episode in the next season
            if (result.length === 0) {
                db.any('SELECT id, season_number, episode FROM serie_episode WHERE serie_id = $1 AND season_number = $2 AND episode = $3', [serie_id, season_number+1, 1]).then(result => {
                    // If there is no more seasons
                    if (result.length === 0) {
                        resolve({
                            foundEpisode: false
                        });
                    } else {
                        resolve({
                            internalID: result[0].id,
                            season: result[0].season_number,
                            episode: result[0].episode,
                            foundEpisode: true
                        });
                    }
                });
            } else {
                resolve({
                    internalID: result[0].id,
                    season: result[0].season_number,
                    episode: result[0].episode,
                    foundEpisode: true
                });
            }
        });
    });
}