import Movie from '../../../../../../../lib/media/Movie';
import HlsManager from '../../../../../../../lib/hls/HlsManager';
import Transcoding from '../../../../../../../lib/hls/transcoding'
const Logger = require('../../../../../../../lib/logger');
const logger = new Logger().getInstance();
const pathLib = require('path');
const db = require('../../../../../../../lib/db');
const fs = require('fs');

const waitUntilFileExists = (filePath, requestedSegment, hlsManager, group) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            fs.access(filePath, fs.constants.F_OK, (err) => {
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
    return requestedSegment >= hlsManager.getTranscodingStartSegment(group) &&
        requestedSegment < hlsManager.getVideoTranscodingSegment(group) + 2;
};

export default async (req, res) => {
    const hlsManager = new HlsManager();
    const { id, quality, group } = req.query;
    let resolved = false;
    hlsManager.setLastRequestedTime(group);
    return new Promise(async (resolve) => {
        const segmentText = req.query.segment; //<segment>.ts
        const segmentsText = req.query.segments; // segments in text format
        const segments = parseInt(segmentsText); // segments in int
        const segment = parseInt(segmentText); //<segment>
        const startSegment = Math.max(segment - 1, 0);
        const movie = new Movie(id);
        let path;

        HlsManager.lock.enter(async function (token) {
            let promises = [];

            if (!hlsManager.isAnyVideoTranscodingActive(group)) {
                promises.push(hlsManager.startMovieTranscoding(movie, quality, startSegment, group));
            } else {
                if (hlsManager.stopOtherVideoTranscodings(group, quality)) { // Stop other transcodings (other qualities) if they are running
                    logger.DEBUG(`[HLS] Changing quality to ${quality} for group ${group}`)
                    promises.push(hlsManager.startMovieTranscoding(movie, quality, startSegment, group));
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
                    else if ((segment + (Transcoding.FAST_START_SEGMENTS / 4)) > latestSegment && !hlsManager.isFastSeekingRunning(group)) {
                        // If we are seeking inside the fast seeking range and fast seek is not running, restart transcoding
                        logger.DEBUG(`[HLS] Seeking inside the fast seeking range (current segment: ${latestSegment}, requested segment: ${segment}). Restarting at ${startSegment}`);
                        restartTranscoding = true;
                    }


                    // segment = 5, latestSegment =  7
    
                    if (restartTranscoding) {
                        hlsManager.stopAllVideoTranscodings(group);
                        promises.push(hlsManager.startMovieTranscoding(movie, quality, startSegment, group));
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
                });
                HlsManager.lock.leave(token);
            });

        });
    });
}

export const config = {
    api: {
      externalResolver: true,
    },
  }