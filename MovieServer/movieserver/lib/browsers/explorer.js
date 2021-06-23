const Browser = require('./browser');

class Explorer extends Browser {
    constructor(version) {
        let supportedVideoCodecs = [];
        let supportedAudioCodecs = [];

        // Video codecs
        if (version >= 9) {
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("h264");
        }
        if (version >= 11) {
            supportedVideoCodecs.push("hevc");
            supportedVideoCodecs.push("h265");
            supportedVideoCodecs.push("vp8");
        }

        // Audio codecs
        if (version >= 9) {
            supportedAudioCodecs.push("aac");
            supportedAudioCodecs.push("mp3");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "explorer");
    }
}

module.exports = Explorer;