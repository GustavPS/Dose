class PresetUtil {
    constructor() {
        this.CRF_SETTING = 22;
    }

    /*
    PUBLIC FUNCTIONS
    */
    getTranscodingParameters(quality) {
        let options;
        // TODO: Parse this as a boolean
        if (process.env.GPU_TRANSCODING === "TRUE") {
            options = this.getGpuTranscodingParameters();
        } else {
            options = this.getCpuTranscodingParameters();
        }
        options.push(this.getQualityParameter(quality));
        return options;
    }

    getVideoCodec() {
        // TODO: Parse this as a boolean
        if (process.env.GPU_TRANSCODING === "TRUE") {
            return this.getGpuVideoCodec();
        } else {
            return this.getCpuVideoCodec();
        }
    }

    /*
    PRIVATE FUNCTIONS
    */
    getDefaultParameters() {
        return [
            '-g 52',
            '-map 0',
            '-map -v',
            '-map 0:V',
            '-sn',
            '-deadline realtime',
            '-lag-in-frames 0',
            '-static-thresh 0',
            '-frame-parallel 1',
            `-crf ${this.CRF_SETTING}`,
            '-movflags frag_keyframe+empty_moov+faststart',
            '-pix_fmt yuv420p'
        ];
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
                throw `${quality} is not a valid quality selector (util.js)`
        }
        return parameter;
    }

    getCpuTranscodingParameters() {
        let options = this.getDefaultParameters();
        options.push('-preset ultrafast');
        return options;
    }

    getGpuTranscodingParameters() {
        return this.getDefaultParameters();
    }

    getGpuVideoCodec() {
        return "h264_nvenc";
    }

    getCpuVideoCodec() {
        return "libx264";
    }
}

module.exports = PresetUtil;