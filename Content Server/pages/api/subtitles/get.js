const db = require('../../../lib/db');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
const fs = require('fs');
const path = require('path');
const validateUser = require('../../../lib/validateUser');
var ffmpeg = require('fluent-ffmpeg');
var crypto = require("crypto");
const Logger = require('../../../lib/logger');
const logger = new Logger();


export default (req, res) => {
    return new Promise(async (resolve) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
        res.setHeader('content-type', 'text/plain; charset=utf-8');

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let type = req.query.type;
        let subtitleID = req.query.id;
        let offset = req.query.start ? req.query.start : 0;
        let useSRT = req.query.useSRT ? true : false;
        let minutes = Math.floor(offset / 60);
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        let seconds = offset % 60;

        let subPath;
        try {
            if (type == 'movie') {
                subPath = await getMovieSubtitlePath(subtitleID);
            } else if (type == 'serie') {
                subPath = await getEpisodeSubtitlePath(subtitleID);
            } else {
                res.status(404).end();
                resolve();
                return;
            }
        } catch(error) {
            // This happens if we didn't find the subtitle by ID, send 404.
            if (error === 404) {
                res.status(404).end();
                resolve();
            } else {
                throw(error);
            }
        }

        let folderName = path.dirname(subPath);
        let output = path.join(folderName, crypto.randomBytes(20).toString('hex')+'.vtt');
        logger.DEBUG(`Subtitle: transcoding output path: ${output}`)

        // Transcode the subtitle to vtt, with offset according the variables hours, minutes and seconds
        if (useSRT) {
            logger.DEBUG("Subtitle: sending SRT directly")
            fs.readFile(subPath, (err, data) => {
                if (err) {
                    logger.ERROR(`Error reading subtitle file: ${err}`);
                    return;
                }
                res.status(200).send(data);
                resolve();
            });
        } else {
            ffmpeg(subPath)
            .outputOptions([
                `-ss ${hours}:${minutes}:${seconds}`
            ])
            .output(output)
            .on('end', function() {
                // Read the new subtitle file and send it to the user
                fs.readFile(output, (err, data) => {
                    if (err) {
                        logger.ERROR(`Error reading subtitle file: ${err}`);
                        return;
                    }
                    res.status(200).send(data);
                    // Remove the new subtitle file
                    fs.unlink(output, () => {});
                    resolve();
                });
            })
            .on('error', (err, stdout, stderr) => {
                logger.ERROR(`Error transcoding subtitle: ${err}`);
                logger.ERROR(stdout);
                logger.ERROR(stderr);
            })
            .run()
        }

    });
    
}

function getMovieSubtitlePath(subtitleID) {
    return new Promise((resolve, reject) => {
            db.one(`SELECT subtitle.path AS subtitle_path, library.path AS library_path FROM library 
        INNER JOIN subtitle
        ON subtitle.library_id = library.id AND subtitle.id = $1`, [subtitleID])
        .then(result => {
            let path = result.library_path + result.subtitle_path;
            resolve(path);
        }).catch(error => {
            reject(404);
        })

    });
}

function getEpisodeSubtitlePath(subtitleID) {
    return new Promise((resolve, reject) => {
        db.one(`SELECT serie_episode_subtitle.path AS subtitle_path, library.path AS library_path FROM library
                INNER JOIN serie_episode_subtitle
                ON serie_episode_subtitle.library_id = library.id AND serie_episode_subtitle.id = $1
        `, [subtitleID])
        .then(result => {
            let path = result.library_path + result.subtitle_path;
            resolve(path);
        }).catch(error => {
            reject(404);
        })
    });
}