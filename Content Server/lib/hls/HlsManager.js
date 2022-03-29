const db = require('../db');
const Movie = require('../media/Movie');
const Transcoding = require('./transcoding.js');
const TranscodingGroup = require('./TranscodingGroup.js');
const AsyncLock = require('node-async-locks').AsyncLock;
const Logger = require('../logger');
const Config = require('../config');
const logger = new Logger();
const config = new Config();

// A singleton class managing HLS Transcodings
class HlsManager {
    static lock = new AsyncLock();

    constructor() {
        // TODO: This shouldn't be a global variable, but haven't found a better way yet since it's used in multiple files.
        if (!global.transcodings) {
            global.transcodings = [];
        }
    }
    
    generateHash() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    startTranscoding(content, quality, startSegment, groupHash, audioStreamIndex, audioTranscoding, user) {
        return new Promise(resolve => {
            Promise.all([content.getFilePath(), config.getConfig()]).then(([filePath, conf]) => {
                const useGpuTranscoding = conf.gpuTranscoding ?? false;
                const output = Transcoding.createTempDir();

                const fastTranscoding = new Transcoding(filePath, startSegment, true, useGpuTranscoding); // Fast transcoding
                const transcodingGroup = new TranscodingGroup(user, content, groupHash, fastTranscoding);

                const slowTranscodingStartSegment = startSegment + (Transcoding.FAST_START_TIME / Transcoding.SEGMENT_DURATION)
                const slowTranscoding = new Transcoding(filePath, slowTranscodingStartSegment, false, useGpuTranscoding); // Slow transcoding
                transcodingGroup.addSlowTranscoding(slowTranscoding);
                global.transcodings.push(transcodingGroup);
                const promises = transcodingGroup.start(quality, output, audioStreamIndex, audioTranscoding);

                Promise.all(promises).then(() => {
                    resolve();
                });
            });
        });
    }

    stopOtherVideoTranscodings(group, quality) {
        let i = global.transcodings.length;
        let anythingStopped = false;
        while (i--) {
            if (global.transcodings[i].group == group &&
                global.transcodings[i].getQuality() !== quality) {
                    global.transcodings[i].stop();
                    global.transcodings.splice(i, 1);
                    anythingStopped = true;
            }
        }
        return anythingStopped;
    }

    stopAllVideoTranscodings(group) {
        let i = global.transcodings.length;
        let stopped = 0;
        while (i--) {
            if (global.transcodings[i].group == group) {
                    global.transcodings[i].stop();
                    global.transcodings.splice(i, 1);
                    stopped++;
                    if (stopped > 1) {
                        logger.WARNING(`[HLS] Stopped ${stopped} transcoding groups, should only be 1`);
                    }
            }
        }
    }

    setLastRequestedTime(group) {
        for (let i = 0; i < global.transcodings.length; i++) {
            if (global.transcodings[i].group === group) {
                global.transcodings[i].updateLastRequestedTime(Date.now());
            }
        }
    }
    
    stopOldTranscodings() {
        const now = Date.now();
        let i = global.transcodings.length;
        while (i--) {
            const timeoutDate = new Date(global.transcodings[i].lastRequestedTime + Transcoding.TIMEOUT_TIME);
            if (timeoutDate <= now) {
                logger.DEBUG(`[HLS] Stopping old transcoding, group: ${global.transcodings[i].group}`);
                global.transcodings[i].stop();
                global.transcodings.splice(i, 1);
            }
        }
    }

    getVideoTranscodingSegment(group) {
        const transcoding = global.transcodings.find(transcoding => transcoding.group === group);
        return transcoding.getLatestSegment();
    }

    getVideoTranscodingOutputPath(group) {
        const transcoding = global.transcodings.find(transcoding => transcoding.group === group);
        return transcoding.getOutputFolder();
    }

    /**
     * Get the start segment of the transcoding for the given hash.
     * 
     * @param {string} hash - The hash of the group of transcodings 
     * @returns {number} - The start segment of the transcoding OR -1 if no transcoding is active for the given hash
     */
    getTranscodingStartSegment(group) {
        const transcoding = global.transcodings.find(transcoding => transcoding.group === group);
        if (transcoding == undefined) return -1;
        return transcoding.getStartSegment();
    }

    isTranscodingFinished(group) {
        const transcoding = global.transcodings.find(transcoding => transcoding.group === group);
        if (transcoding == undefined) return false;
        return transcoding.isTranscodingFinished();
    }

    isAnyVideoTranscodingActive(group) {
        return global.transcodings.some(transcoding => transcoding.group === group);
    }

    isFastSeekingRunning(group) {
        return global.transcodings.some(transcoding => transcoding.group === group && transcoding.isFastStartRunning());
    }

    updateProgress(group, progress) {
        const transcoding = global.transcodings.find(transcoding => transcoding.group === group);
        if (transcoding == undefined) return;
        transcoding.updateProgress(progress);
    }

    /**
     * Get all active transcodings
     */
    getActiveTranscodings() {
        return global.transcodings;
    }
}

module.exports = HlsManager;