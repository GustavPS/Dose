const db = require('../../../../../lib/db');
const cors = require('../../../../../lib/cors');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');
const validateUser = require('../../../../../lib/validateUser');

export default (req, res) => {
    return new Promise((resolve) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
    
        // TODO: Error handling
        let contentId = req.query.id;
        // TODO: FELHANTERING
        let time = Math.floor(parseInt(req.query.time));
        let videoDuration = Math.floor(parseInt(req.query.videoDuration));
        let token = req.query.token;
        let type = req.query.type;
        let decoded = validateUser(token);
    
        if (!decoded) {
            res.status(403).end();
            resolve();
            return;
        }
    
        let user_id = decoded.user_id;
        // Update the runtime that we got from the metadata with the real runtime.
        if (type === 'movie') {
            setMovieProgress(contentId, user_id, time, videoDuration).then(() => {
                res.status(200).end();
                resolve();
            });
        } else if(type === 'serie') {
            setEpisodeProgress(contentId, user_id, time, videoDuration).then(() => {
                res.status(200).end();
                resolve();
            });
        } else {
            res.status(404).end();
            resolve();
        }
    });
}

function setMovieProgress(movie_id, user_id, time, videoDuration) {
    return new Promise((resolve, reject) => {
        db.none('UPDATE movie_metadata SET run_time = $1 WHERE movie_id = $2', [videoDuration, movie_id])
        .then(() => {
        // Get the runtime from the movie
            db.any('SELECT run_time FROM movie_metadata WHERE movie_id = $1', [movie_id])
            .then(result => {
                // I don't think we need this check here?
                if (result.length > 0) {
                    // If the user only has less than 5 minutes left of the movie, remove the movie_progress entry.
                    if (time >= result[0].run_time - 300) {
                        db.none('DELETE FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id]);
                        resolve();

                    } else {
                        db.any('SELECT * FROM user_movie_progress WHERE user_id = $1 AND movie_id = $2', [user_id, movie_id])
                        .then(result => {
                            if (result.length === 0) {
                                db.none('INSERT INTO user_movie_progress (user_id, movie_id, time) VALUES ($1, $2, $3)', [user_id, movie_id, time]);
                            } else {
                                db.none('UPDATE user_movie_progress SET time = $1 WHERE user_id = $2 AND movie_id = $3', [time, user_id, movie_id]);
                            }
                            resolve();
                        })
                    }
                } else {
                    console.log("Currenttime/set didn't find any results from movie_metadata. THIS SHOULD NEVER HAPPEN")
                    resolve();
                }
            });
        })
    });
}

// Episode ID is the internal ID.
function setEpisodeProgress(episode_id, user_id, time, videoDuration) {
    let epochTime = Date.now();
    return new Promise((resolve, reject) => {
        db.tx(async t => {
            let episodeInfo = await t.one('SELECT serie_id, season_number, episode FROM serie_episode WHERE id = $1', [episode_id]);
            // Set the run_time of the episode (the duration)
            await t.none('UPDATE serie_episode_metadata SET run_time = $1 WHERE episode_number = $2 AND season_number = $3 AND serie_id = $4', [videoDuration, episodeInfo.episode, episodeInfo.season_number, episodeInfo.serie_id]);
            // We've watched 90% of the episode, we should remove the serie_progress entry
            if (time / videoDuration >= 0.9) {
                t.none('DELETE FROM user_episode_progress WHERE episode_id = $1 AND user_id = $2', [episode_id, user_id]);
                // Insert the next episode to watch in the database
                let id = await getNextEpisodeID(episode_id, episodeInfo.serie_id, episodeInfo.season_number);
                if (id !== false) {
                    t.none('INSERT INTO user_next_episode (user_id, serie_id, episode_id, last_watched) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, serie_id) DO NOTHING', [user_id, episodeInfo.serie_id, id, epochTime]);
                }
                resolve();
            } else {
                // If we havn't watched 90% of the episode, update the watchtime and remove the "next episode" row from the databsae
                let result = await t.any('SELECT * FROM user_episode_progress WHERE user_id = $1 AND episode_id = $2',[user_id, episode_id]);
                if (result.length === 0) {
                    t.none('INSERT INTO user_episode_progress (user_id, episode_id, time, last_watched) VALUES ($1, $2, $3, $4)', [user_id, episode_id, time, epochTime]);
                } else {
                    t.none('UPDATE user_episode_progress SET time = $1, last_watched = $2 WHERE user_id = $3 AND episode_id = $4', [time, epochTime, user_id, episode_id]);
                }
                // Remove the "next episode" row from the database (because the user is currently watching it)
                t.none('DELETE FROM user_next_episode WHERE user_id = $1 AND serie_id = $2', [user_id, episodeInfo.serie_id]);
                t.none('DELETE FROM user_episode_progress WHERE episode_id != $1 AND user_id = $2 AND episode_id IN (SELECT id FROM serie_episode WHERE serie_id = $3)', [episode_id, user_id, episodeInfo.serie_id]);
                resolve();
            }

        });
    });
}

function getNextEpisodeID(episode_id, serie_id, season_number) {
    return new Promise((resolve, reject) => {

        db.one('SELECT episode FROM serie_episode WHERE id = $1', [episode_id]).then(episodeNumber => {
            episodeNumber = episodeNumber.episode;
            db.any('SELECT id FROM serie_episode WHERE serie_id = $1 AND season_number = $2 AND episode = $3', [serie_id, season_number, episodeNumber+1]).then(result => {
                // If this was the last episode in the show, try to find the first episode in the next season
                if (result.length === 0) {
                    db.any('SELECT id FROM serie_episode WHERE serie_id = $1 AND season_number = $2 AND episode = $3', [serie_id, season_number+1, 1]).then(result => {
                        // If there is no more seasons
                        if (result.length === 0) {
                            resolve(false);
                        } else {
                            resolve(result[0].id);
                        }
                    });
                } else {
                    resolve(result[0].id);
                }
            });
        });
    });

}