const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const getBrowser = require('../../../../lib/browsers/util');
const Logger = require('../../../../lib/logger');
const logger = new Logger();
import { useUserAgent } from 'next-useragent'
import Episode from '../../../../lib/media/Episode';
import Movie from '../../../../lib/media/Movie';

export default async (req, res) => {
    return new Promise(async (resolve, reject) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        let type = req.query.type;
        if (!['movie', 'serie'].includes(type)) {
            res.status(404).end();
            resolve();
            return;
        }

        const userAgent = useUserAgent(req.headers['user-agent']);
        const browser = getBrowser(userAgent);

        let resolution = [];
        const content = type === 'movie' ? new Movie(req.query.id) : new Episode(req.query.id);

        try {
            if (type === 'movie') {
                resolution = await getMovieResolution(req.query.id);
            } else if (type === 'serie') {
                resolution = await getEpisodeResolution(req.query.id);
            }
        } catch (error) {
            logger.DEBUG(`User tried to get the available resolutions movie/episode with id ${req.query.id} which does not exist`);
            res.status(404).end();
            return;
        }

        let availableResolutions = [];
        if (resolution["8k"]) {
            availableResolutions.push("8k");
        }
        if (resolution["4k"]) {
            availableResolutions.push("4k");
        }
        if (resolution["1440p"]) {
            availableResolutions.push("1440p");
        }
        if (resolution["1080p"]) {
            availableResolutions.push("1080p");
        }
        if (resolution["720p"]) {
            availableResolutions.push("720p");
        }
        if (resolution["480p"]) {
            availableResolutions.push("480p");
        }
        if (resolution["360p"]) {
            availableResolutions.push("360p");
        }
        if (resolution["240p"]) {
            availableResolutions.push("240p");
        }

        if (availableResolutions.length == 0) {
            logger.DEBUG(`No saved resolutions, using 1080p`);
            availableResolutions.push("1080p");
        }

        const isDirectplayReady = await content.isDirectplayReady();
        let directPlay = browser.videoCodecSupported(resolution["codec"]) && isDirectplayReady && browser.audioCodecSupported("aac")

        res.status(200).json({
            resolutions: availableResolutions,
            directplay: directPlay
        });
        resolve();
    });
}


function getMovieResolution(movieID) {
    return new Promise((resolve, reject) => {
        db.one('SELECT "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec" FROM movie_resolution WHERE movie_id = $1', [movieID]).then(result => {
            resolve(result);
        }).catch(error => {
            logger.ERROR(`Can't get movie resolution: ${error}`);
            reject();
        });
    });
}

function getEpisodeResolution(episodeID) {
    return new Promise((resolve, reject) => {
        db.one('SELECT "240p", "360p", "480p", "720p", "1080p", "1440p", "4k", "8k", "codec" FROM serie_episode_resolution WHERE episode_id = $1', [episodeID]).then(result => {
            resolve(result);
        }).catch(error => {
            logger.ERROR(`Can't get episode resolution: ${error}`);
            reject();
        });
    });
}