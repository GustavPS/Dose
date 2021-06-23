const Browser = require('./browser');

class Safari extends Browser {
    constructor(version) {
        let supportedVideoCodecs = ["mpeg-1", "mpeg-2"];
        let supportedAudioCodecs = ["alac"];

        // Video codecs
        if (version >= 3) {
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("h264");
        }
        if (version >= 11) {
            supportedVideoCodecs.push("hevc");
            supportedVideoCodecs.push("h265");
        }

        // Audio codecs
        if (version >= 3) {
            supportedAudioCodecs.push("aac");
        }
        if (version >= 11) {
            supportedAudioCodecs.push("flac");
        }
        if (version >= 3) {
            supportedAudioCodecs.push("mp3");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "safari");
    }
}

module.exports = Safari;