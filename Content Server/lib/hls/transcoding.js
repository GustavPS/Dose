const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const Logger = require('../logger');
const logger = new Logger().getInstance();

class Transcoding {
    static TEMP_FOLDER = process.env.TEMP_DIRECTORY;
    static SEGMENT_DURATION = 4;
    static TIMEOUT_TIME = 10000; // Time in milliseconds

    constructor(filePath, contentId, startSegment, hash, groupHash=hash) {
        this.CRF_SETTING = 22;
        this.filePath = filePath;
        this.startSegment = startSegment;
        this.latestSegment = startSegment;
        this.output = "";
        this.ffmpegProc;
        this.type;
        
        this.contentId = contentId;
        this.hash = hash;
        this.groupHash = groupHash;
        this.finished = false;
        this.lastRequestedTime = Date.now();
    }

    getOutput() {
        return this.output;
    }

    getGpuVideoCodec() {
        return "h264_nvenc";
    }

    getCpuVideoCodec(directplay) {
        if (directplay) {
            return "copy";
        } else {
            return "libx264";
        }
    }

    getVideoCodec(directplay) {
        // TODO: Parse this as a boolean
        if (process.env.GPU_TRANSCODING === "TRUE") {
            return this.getGpuVideoCodec();
        } else {
            return this.getCpuVideoCodec(directplay);
        }
    }

    getQualityParameter(quality) {
        let parameter;
        switch (quality) {
            case "240P":
                parameter = '-vf scale=trunc(oh*a/2)*2:240';
                break;
            case "360P":
                parameter = '-vf scale=trunc(oh*a/2)*2:360';
                break;
            case "480P":
                parameter = '-vf scale=trunc(oh*a/2)*2:480';
                break;
            case "720P":
                parameter = '-vf scale=trunc(oh*a/2)*2:720';
                break;
            case "1080P":
                parameter = '-vf scale=trunc(oh*a/2)*2:1080';
                break;
            case "1440P":
                parameter = '-vf scale=trunc(oh*a/2)*2:1440';
                break;
            case "4K":
                parameter = '-vf scale=trunc(oh*a/2)*2:2160';
                break;
            case "8K":
                parameter = '-vf scale=trunc(oh*a/2)*2:4320';
                break;
            default:
                throw `${quality} is not a valid quality selector (transcoding.js)`
        }
        return parameter;
    }

    getSeekParameter() {
        return `-ss ${this.startSegment * Transcoding.SEGMENT_DURATION}`;
    }

    setType(type) {
        this.type = type;
    }

    generateHash() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '/';
    }

    timestampToSeconds(timestamp) {
        let time = timestamp.split(':');
        let seconds = parseInt(time[0]) * 60 * 60 + parseInt(time[1]) * 60 + parseInt(time[2]);
        return seconds;
    }

    addSeekTimeToSeconds(seconds) {
        return seconds + this.startSegment * Transcoding.SEGMENT_DURATION;
    }

    secondsToSegment(seconds) {
        return Math.floor(seconds / Transcoding.SEGMENT_DURATION);
    }

    createTempDir() {
        let dirExists = true;
        let dir;
        while (dirExists) {
            dir = path.join(Transcoding.TEMP_FOLDER, this.generateHash());
            dirExists = fs.existsSync(this.output);
        }
        fs.mkdirSync(dir);
        return dir;
    }

    start(quality) {
        this.quality = quality;
        return new Promise(resolve => {
            this.output = this.createTempDir();
            const directplay = quality === "DIRECTPLAY";

            let outputOptions = [
                '-copyts', // Fixes timestamp issues (Keep timestamps as original file)
                //`-c:v ${this.getVideoCodec()}`,

                //'-movflags frag_keyframe+empty_moov+faststart',
                //'-pix_fmt yuv420p',
                //`-c:a aac`,
                '-g 52',
                `-crf ${this.CRF_SETTING}`,
                '-sn',
                '-deadline realtime',
                '-preset ultrafast',
                '-lag-in-frames 0',
                '-static-thresh 0',
                '-frame-parallel 1',
                '-f hls',
                '-ac 2', // Set two audio channels. Fixes audio issues
                `-hls_time ${Transcoding.SEGMENT_DURATION}`,
                '-force_key_frames expr:gte(t,n_forced*2)',
                '-hls_playlist_type vod',
                `-start_number ${this.startSegment}`,
                '-strict -2', // ?
                '-level 4.1' // Might fix chromecast issues?
            ]
            if (!directplay) {
                outputOptions.push(this.getQualityParameter(quality));
            }

            this.ffmpegProc = ffmpeg(this.filePath)
            .withVideoCodec(this.getVideoCodec(directplay))
            .withAudioCodec("aac")
            .withVideoBitrate(4000)

            .inputOptions([
                '-copyts', // Fixes timestamp issues (Keep timestamps as original file)
                this.getSeekParameter(),
                '-readrate 3'
            ])
            .outputOptions(outputOptions)
            .on('end', () => {
                this.finished = true;
            })

            .on('progress', progress => {
                const seconds = this.addSeekTimeToSeconds(this.timestampToSeconds(progress.timemark));
                const latestSegment = Math.floor(seconds / Transcoding.SEGMENT_DURATION);
                this.latestSegment = latestSegment;
            })
            .on('start', (commandLine) => {
                logger.DEBUG(`[HLS] Spawned Ffmpeg (startSegment: ${this.startSegment}) with command: ${commandLine}`);
                resolve();
            })
            .on('error', (err, stdout, stderr) => {
                if (err.message != 'Output stream closed' && err.message != 'ffmpeg was killed with signal SIGKILL') {
                    logger.ERROR(`Cannot process video: ${err.message}`);
                    logger.ERROR(`ffmpeg stderr: ${stderr}`);
                }
            })
            .output(this.output)
            this.ffmpegProc.run();
        });
    }

    stop() {
        logger.DEBUG("[HLS] Stopping transcoding");
        this.ffmpegProc.kill();
        this.removeTempFolder();
    }

    removeTempFolder() {
        logger.DEBUG("[HLS] Removing temp folder");
        fs.rmdirSync(this.output, {recursive: true});
    }
}

module.exports = Transcoding;