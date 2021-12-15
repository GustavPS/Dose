/**
 * NOTE:
 *  This API endpoint is NOT using NextJS. It is using regular expressJS to serve the segments (see server.js for the routing).
 *  This is because NextJS will remove support for API-endpoints with more than 4MB responses in the future. We need to send
 *  more data than 4MB to the client since this is where we are serving video segments.
 */

const Logger = require('../../../../../../../lib/logger');
const logger = new Logger();
const pathLib = require('path');
const db = require('../../../../../../../lib/db');
const fs = require('fs');

const Movie = require('../../../../../../../lib/media/Movie');
const Episode = require('../../../../../../../lib/media/Episode');
const HlsManager = require('../../../../../../../lib/hls/HlsManager');
const Transcoding = require('../../../../../../../lib/hls/transcoding');
const getBrowser = require('../../../../../../../lib/browsers/util');
const validateUser = require('../../../../../../../lib/validateUser');
const useUserAgent = require('next-useragent');



var express = require('express');
var router = express.Router();

const waitUntilFileExists = (filePath, requestedSegment, hlsManager, group) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            // Stop checking if the transcoding stopped
            if (!hlsManager.isAnyVideoTranscodingActive(group)) {
                clearInterval(interval);
                reject();
            }
            fs.access(filePath, fs.constants.F_OK, (err) => {
                // If isSegmentFinished returned false because the transcoding isn't running we will
                // stop the loop at the next interval (isAnyVideoTranscodingActive will be false)
                if (!err && isSegmentFinished(requestedSegment, hlsManager, group)) {
                    clearInterval(interval);
                    resolve();
                }
            });
        }, 1000);
    });
};

const checkIfFileExists = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

const isSegmentFinished = (requestedSegment, hlsManager, group) => {
    if (hlsManager.isTranscodingFinished(group)) {
        return true;
    }
    const startSegment = hlsManager.getTranscodingStartSegment(group);
    if (startSegment == -1) {
        // No transcoding was found, return false
        return false;
    }
    return requestedSegment >= hlsManager.getTranscodingStartSegment(group) &&
        requestedSegment < hlsManager.getVideoTranscodingSegment(group) + 2;
};

//export default async (req, res) => {
const getSegment = async (req, res) => {
    const hlsManager = new HlsManager();
    // req.params = the GET parameters from the folder structure
    const { id, quality, segment } = req.params;
    // req.query = the GET parameters from the URL (after the ? in the URL)
    const { group, audioStream, type, token } = req.query;

    let user = validateUser(token, process.env.SECRET, 10800); // 3 hours
    if (!user) {
        res.status(403).end();
        return;
    }
    // Remove exp from the user object
    user = {
        username: user.username,
        id: user.user_id,
    }
    let resolved = false;
    hlsManager.setLastRequestedTime(group);

    const content = type == "movie" ? new Movie(id) : new Episode(id);

    //const movie = new Movie(id);    
    const userAgent = useUserAgent.useUserAgent(req.headers['user-agent']);
    const browser   = getBrowser(userAgent);

    //const codecInfo = await movie.getAudioCodecByStreamIndex(audioStream);
    const codecInfo = await content.getAudioCodecByStreamIndex(audioStream);

    return new Promise(async (resolve) => {
        const segmentText = req.params.segment; //<segment>.ts
        const segmentsText = req.query.segments; // segments in text format
        const segments = parseInt(segmentsText); // segments in int
        const segment = parseInt(segmentText); //<segment>
        const startSegment = Math.max(segment - 1, 0);
        let path;

        // Should be lock per group somehow
        HlsManager.lock.enter(async function (token) {
            let promises = [];

            if (!hlsManager.isAnyVideoTranscodingActive(group)) {
                const audioSupported = browser.audioCodecSupported(codecInfo.codec);
                promises.push(hlsManager.startTranscoding(content, quality, startSegment, group, audioStream, audioSupported, user));
            } else {
                if (hlsManager.stopOtherVideoTranscodings(group, quality)) { // Stop other transcodings (other qualities) if they are running
                    logger.DEBUG(`[HLS] Changing quality to ${quality} for group ${group}`)
                    const audioSupported = browser.audioCodecSupported(codecInfo.codec);
                    promises.push(hlsManager.startTranscoding(content, quality, startSegment, group, audioStream, audioSupported, user));
                } else {
                    const path = pathLib.join(hlsManager.getVideoTranscodingOutputPath(group), segmentText);
                    const segmentExists = await checkIfFileExists(path);
                    let restartTranscoding = false;
    
                    const latestSegment = hlsManager.getVideoTranscodingSegment(group);
                    // Increase the threshold to avoid the situation where the transcoding is being stopped too early because of slow transcodings
                    if (segment > (latestSegment + 10)) {
                        // Restart transcoding since seektime is too far away
                        logger.DEBUG(`[HLS] Too long seek (current segment: ${latestSegment}, requested segment: ${segment}). Restarting at ${startSegment}`)
                        restartTranscoding = true;
                    } else if (segment < hlsManager.getTranscodingStartSegment(group) && !segmentExists) {
                        // Restart transcoding since seektime is in the past, and that segment does not exist
                        logger.DEBUG(`[HLS] Seeking in the past for a segment that doesn't exist (current segment: ${latestSegment}, requested segment: ${segment}). Restarting at ${startSegment}`)
                        restartTranscoding = true;
                    }
                    else if ((segment + (Transcoding.FAST_START_SEGMENTS / 4)) > latestSegment && !hlsManager.isFastSeekingRunning(group) && !hlsManager.isTranscodingFinished(group)) {
                        // If we are seeking inside the fast seeking range and fast seek is not running, restart transcoding
                        logger.DEBUG(`[HLS] Seeking inside the fast seeking range (current segment: ${latestSegment}, requested segment: ${segment}). Restarting at ${startSegment}`);
                        restartTranscoding = true;
                    }
    
                    if (restartTranscoding) {
                        hlsManager.stopAllVideoTranscodings(group);
                        const audioSupported = browser.audioCodecSupported(codecInfo.codec);
                        promises.push(hlsManager.startTranscoding(content, quality, startSegment, group, audioStream, audioSupported, user));
                    }
                }
            }
            //requestedSegment, startSegment, lastSegment, isTranscodingFinished
            const startedNewTranscoding = promises.length > 0;
            Promise.all(promises)
            .then(() => {
                path = pathLib.join(hlsManager.getVideoTranscodingOutputPath(group), segmentText);
                const waitForSegment = startedNewTranscoding ? segment + 2 : segment;
                waitUntilFileExists(path, waitForSegment, hlsManager, group)
                .then(() => {
                    res.setHeader('Access-Control-Allow-Origin', "*");
                    res.setHeader('Access-Control-Allow-Headers', "*");
                    res.status(200).sendFile(path);
                    resolved = true;
                    resolve();
                })
                .catch(() => {
                    // Transcoding was stopped
                    logger.DEBUG(`[HLS] Transcoding was stopped for group ${group}, not waiting for segment anymore`);
                    res.status(404).send();
                    resolve();
                });
                HlsManager.lock.leave(token);
            });

        });
    });
};

module.exports = getSegment;