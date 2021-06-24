const Browser = require('./browser');

class Chrome extends Browser {
    constructor(version) {
        let supportedVideoCodecs = [];
        let supportedAudioCodecs = ["aac", "flac", "mp3"];

        // Video codecs
        if (version >= 3) {
            supportedVideoCodecs.push("theora");
        }
        if (version >= 4) {
            supportedVideoCodecs.push("h264");
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("ogg");
        }
        if (version >= 25) {
            supportedVideoCodecs.push("vp8");
        }
        if (version >= 29) {
            supportedVideoCodecs.push("vp9");
        }
        if (version >= 70) {
            supportedVideoCodecs.push("av1");
        }

        // Audio codecs
        if (version >= 4) {
            supportedAudioCodecs.push("vorbis");
        }
        if (version >= 33) {
            supportedAudioCodecs.push("opus");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "chrome");
    }
}

module.exports = Chrome;