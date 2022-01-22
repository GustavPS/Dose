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
const srt2vtt = require('srt-to-vtt');


export default (req, res) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'text/plain; charset=utf-8',
    });
    return new Promise(async (resolve) => {
        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }



        let type = req.query.type;
        let subtitleID = req.query.id;

        const pathPromise = type == "movie" ? getMovieSubtitlePath(subtitleID) : getEpisodeSubtitlePath(subtitleID);

        pathPromise.then(path => {
            fs.createReadStream(path).pipe(srt2vtt()).pipe(res);
        });
    });
}

const getMovieSubtitlePath = (subtitleID) => {
    return new Promise((resolve, reject) => {
        db.one(`SELECT subtitle.path AS subtitle_path, library.path AS library_path FROM library 
        INNER JOIN subtitle
        ON subtitle.library_id = library.id AND subtitle.id = $1`, [subtitleID])
            .then(result => {
                resolve(path.join(result.library_path, result.subtitle_path));
            }).catch(error => {
                reject(404);
            })

    });
}

const getEpisodeSubtitlePath = (subtitleID) => {
    return new Promise((resolve, reject) => {
        db.one(`SELECT serie_episode_subtitle.path AS subtitle_path, library.path AS library_path FROM library
                INNER JOIN serie_episode_subtitle
                ON serie_episode_subtitle.library_id = library.id AND serie_episode_subtitle.id = $1
        `, [subtitleID])
            .then(result => {
                resolve(path.join(result.library_path, result.subtitle_path));
            }).catch(error => {
                reject(404);
            })
    });
}