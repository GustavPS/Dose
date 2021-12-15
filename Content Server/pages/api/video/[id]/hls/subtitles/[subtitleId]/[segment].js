const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
import Transcoding from '../../../../../../../lib/hls/transcoding'
const db = require('../../../../../../../lib/db');
const Logger = require('../../../../../../../lib/logger');
const logger = new Logger();


export default async (req, res) => {
    const { id, subtitleId, type } = req.query;
    let subtitlePath;
    try {
        subtitlePath = type == "movie" ? await getMovieSubtitlePath(subtitleId) : await getEpisodeSubtitlePath(subtitleId);
    } catch (error) {
        logger.ERROR(error);
        res.status(404).send('Subtitle not found');
        return;
    }
    const outputFolder = getTempSubtitleDir();
    const outputFile = path.join(outputFolder, 'subtitle-0.vtt'); // We will always only have 1 file (index 0), so only need to send this one after transcoding
    
    res.set({
        "Content-Disposition": "attachment; filename=\"m3u8.m3u8\"",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });
    const outputOptions = [
        '-f segment',
        '-segment_time 14400',
        '-segment_format webvtt',
        '-scodec webvtt'
    ];

    return new Promise(async (resolve) => {
        const ffmpegProc = ffmpeg(subtitlePath)
        .outputOptions(outputOptions)
        .on('end', () => {
            res.status(200).sendFile(outputFile, err => {
                if (err) {
                    logger.ERROR(err);
                    res.sendStatus(500);
                }
                fs.rmdirSync(outputFolder, { recursive: true });
                resolve();
            });
        })
        .on('error', (err, stdout, stderr) => {
            if (err.message != 'Output stream closed' && err.message != 'ffmpeg was killed with signal SIGKILL') {
                console.error(`Cannot transcode subtitle: ${err.message}`);
                console.error(`ffmpeg stderr: ${stderr}`);
            }
            res.status(500);
        })
        .output(path.join(outputFolder, 'subtitle-%d.vtt'))
        ffmpegProc.run();
    });
};

const getTempSubtitleDir = () => {
    let output;
    let dirExists = true;
    let count = 0;
    while (dirExists) {
        output = path.join(Transcoding.TEMP_FOLDER, `subtitle-${count}`);
        count++;
        dirExists = fs.existsSync(output);
    }
    fs.mkdirSync(output);
    return output;
}

const getMovieSubtitlePath = (subtitleID) => {
    return new Promise((resolve, reject) => {
            db.one(`SELECT subtitle.path AS subtitle_path, library.path AS library_path FROM library 
        INNER JOIN subtitle
        ON subtitle.library_id = library.id AND subtitle.id = $1`, [subtitleID])
        .then(result => {
            resolve(path.join(result.library_path, result.subtitle_path));
        }).catch(error => {
            logger.ERROR(error);
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

export const config = {
    api: {
      externalResolver: true,
    },
}
