const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const Logger = require('../logger');
const logger = new Logger();

class Transcoding {
    static TEMP_FOLDER = path.join(process.env.TEMP_DIRECTORY, 'temp');
    static SEGMENT_DURATION = 4;
    static SIMULTANEOUS_DIRECTPLAY_PREPARE_LIMIT = 1;
    static TIMEOUT_TIME = 20000; // 20 seconds in milliseconds
    static FAST_START_SEGMENTS = 50;
    static FAST_START_TIME = Transcoding.SEGMENT_DURATION * Transcoding.FAST_START_SEGMENTS;

    constructor(filePath, startSegment, fastStart=false, gpuTranscoding) {
        this.CRF_SETTING = 22;
        this.filePath = filePath;
        this.startSegment = startSegment;
        this.latestSegment = startSegment;
        this.gpuTranscoding = gpuTranscoding;
        this.output = "";
        this.ffmpegProc;
        
        this.fastStart = fastStart;
        this.finished = false;
    }

    getOutput() {
        return this.output;
    }

    getGpuVideoCodec() {
        return "h264_nvenc";
    }

    getCpuVideoCodec() {
        return "libx264";
    }

    getVideoCodec() {
        if (this.gpuTranscoding) {
            return this.getGpuVideoCodec();
        } else {
            return this.getCpuVideoCodec();
        }
    }

    getQualityParameterCpu(quality) {
        let parameters;
        switch (quality) {
            case "240P":
                parameters = ['-vf scale=320:-2', '-b:v 1M'];
                break;
            case "360P":
                parameters = ['-vf scale=480:-2', '-b:v 1500k'];
                break;
            case "480P":
                parameters = ['-vf scale=854:-2', '-b:v 4M'];
                break;
            case "720P":
                parameters = ['-vf scale=1280:-2', '-b:v 7500k'];
                break;
            case "1080P":
                parameters = ['-vf scale=1920:-2', '-b:v 12M'];
                break;
            case "1440P":
                parameters = ['-vf scale=2560:-2', '-b:v 24M'];
                break;
            case "4K":
                parameters = ['-vf scale=3840:-2', '-b:v 60M'];
                break;
            case "8K":
                parameters = ['-vf scale=7680:-2', '-b:v 120M'];
                break;
            default:
                throw `${quality} is not a valid quality selector (transcoding.js)`
        }
        return parameters;
    }
    
    getQualityParameterGpu(quality) {
        let parameters;
        switch (quality) {
            case "240P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=352:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 1M'];
                break;
            case "360P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=480:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 1500k'];
                break;
            case "480P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=854:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 4M'];
                break;
            case "720P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=1280:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 7500k'];
                break;
            case "1080P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=1920:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 12M'];
                break;
            case "1440P":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=2560:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 24M'];
                break;
            case "4K":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=3860:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 60M'];
                break;
            case "8K":
                parameters = ['-filter_complex [0:v]hwdownload,scale_npp=w=8192:h=-2,format=nv12,format=yuv420p[0:v]', '-b:v 120M'];
                break;
            default:
                throw `${quality} is not a valid quality selector (transcoding.js)`
        }
        return parameters;
    }
    
    getQualityParameter(quality) {
        return this.gpuTranscoding ? this.getQualityParameterGpu(quality) : this.getQualityParameterCpu(quality);
    }

    getSeekParameter() {
        return `-ss ${this.startSegment * Transcoding.SEGMENT_DURATION}`;
    }

    setType(type) {
        this.type = type;
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

    static createTempDir() {
        let dirExists = true;
        let dir;
        while (dirExists) {
            const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '/';
            dir = path.join(Transcoding.TEMP_FOLDER, hash);
            dirExists = fs.existsSync(this.output);
        }
        fs.mkdirSync(dir);
        return dir;
    }

    getCpuOutputOptions() {
        return [
            '-deadline realtime',
            '-preset:v ultrafast'
        ]
    }

    getOutputOptions() {
        //'-level 4.1' was used before, but makes GPU transcoding fail sometimes
        const options = [
            '-copyts', // Fixes timestamp issues (Keep timestamps as original file)
            '-pix_fmt yuv420p',
            '-map 0',
            '-map -v',
            '-map 0:V',
            '-g 52',
            `-crf ${this.CRF_SETTING}`,
            '-sn',
            '-f hls',
            `-hls_time ${Transcoding.SEGMENT_DURATION}`,
            '-force_key_frames expr:gte(t,n_forced*2)',
            '-hls_playlist_type vod',
            `-start_number ${this.startSegment}`,
            '-strict 1', // Force to use specification when decoding audio/video
            '-ac 2', // Set two audio channels. Fixes audio issues
            '-b:a 320k',
            '-muxdelay 0'
        ];

        if (!this.gpuTranscoding) {
            return options.concat(this.getCpuOutputOptions());
        }
        return options;
    }

    getGpuInputOptions() {
        return ['-hwaccel nvdec'];
    }

    getCpuInputOptions() {
        return ['-threads 8'];
    }

    getInputOptions() {
        const options = [
            '-y',
            '-loglevel verbose',
            '-copyts', // Fixes timestamp issues (Keep timestamps as original file)
            this.getSeekParameter(),
        ]


        if (this.gpuTranscoding) {
            return options.concat(this.getGpuInputOptions());
        } else {
            return options.concat(this.getCpuInputOptions());
        }
    }

    start(quality, output, audioStreamIndex, audioSupported) {
        this.quality = quality;
        return new Promise(resolve => {
            this.output = output;

            let outputOptions = this.getOutputOptions();
            outputOptions.push('-map -a');
            outputOptions.push(`-map 0:${audioStreamIndex}`);
            outputOptions = outputOptions.concat(this.getQualityParameter(quality));

            const inputOptions = this.getInputOptions();

            // GPU Transcoding only uses fast-start, so we need to transcode the whole file
            if (this.fastStart && !this.gpuTranscoding) {
                outputOptions.push(`-to ${(this.startSegment * Transcoding.SEGMENT_DURATION) + Transcoding.FAST_START_TIME}`); // Quickly transcode the first segments
            } else if (!this.fastStart) { // TODO: We shouldn't run slow transcoding on GPU
                inputOptions.push('-re'); // Process the file slowly to save CPU
            }

            this.ffmpegProc = ffmpeg(this.filePath)
            .withVideoCodec(this.getVideoCodec())
            .withAudioCodec("aac")
            .inputOptions(inputOptions)
            .outputOptions(outputOptions)
            .on('end', () => {
                this.finished = true;
            })
            .on('progress', progress => {
                // this.addSeekTimeToSeconds(this.timestampToSeconds(progress.timemark)); <- This is needed on other versions of ffmpeg. TODO: How do we know if this is needed?
                const seconds = this.timestampToSeconds(progress.timemark) 
                // Sometimes ffmpeg reports timemark as negative if using nvenc
                if (seconds > 0) {
                    const latestSegment = Math.max(Math.floor(seconds / Transcoding.SEGMENT_DURATION) - 1); // - 1 because the first segment is 0
                    this.latestSegment = latestSegment;
                }
            })
            .on('start', (commandLine) => {
                logger.DEBUG(`[HLS] Spawned Ffmpeg (startSegment: ${this.startSegment}, GPU: ${this.gpuTranscoding}) with command: ${commandLine}`);
                resolve();
            })
            .on('error', (err, stdout, stderr) => {
                if (err.message != 'Output stream closed' && err.message != 'ffmpeg was killed with signal SIGKILL') {
                    console.log(err);
                    console.log(stdout);
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
        // If this process is for a transcoding fast start, we need to keep the temp folder for the slow transcoding process
        if (!this.fastStart || this.gpuTranscoding) {
            this.removeTempFolder();
        }
    }

    removeTempFolder() {
        fs.rm(this.output, {recursive: true, force: true}, (err) => {
            if (err) {
                logger.ERROR(`Error removing transcoding temp output`);
                logger.ERROR(err);
            }
        });
    }
}

module.exports = Transcoding;