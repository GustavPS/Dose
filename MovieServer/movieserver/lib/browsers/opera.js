const Browser = require('./browser');

class Opera extends Browser {
    constructor(version) {
        let supportedVideoCodecs = [];
        let supportedAudioCodecs = ["aac", "mp3"];

        // Video codecs
        if (version >= 10) {
            supportedVideoCodecs.push("theora");
            supportedVideoCodecs.push("vp9");
        }
        if (version >= 16) {
            supportedVideoCodecs.push("vp8");
        }
        if (version >= 25) {
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("h264");
        }
        if (version >= 57) {
            supportedVideoCodecs.push("av1");
        }

        // Audio codecs
        if (version >= 11) {
            supportedAudioCodecs.push("vorbis");
        }
        if (version >= 20) {
            supportedAudioCodecs.push("opus");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "opera");
    }
}

module.exports = Opera;