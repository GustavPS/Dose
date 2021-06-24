const Browser = require('./browser');

class Firefox extends Browser {
    constructor(version) {
        let supportedVideoCodecs = [];
        let supportedAudioCodecs = ["aac", "mp3"];

        if (version >= 3) {
            supportedVideoCodecs.push("theora");
            supportedVideoCodecs.push("ogg");
        }
        if (version >= 4) {
            supportedVideoCodecs.push("vp8");
        }
        if (version >= 28) {
            supportedVideoCodecs.push("vp9");
        }
        if (version >= 35) {
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("h264");
        }
        if (version >= 67) {
            supportedVideoCodecs.push("av1");
        }

        // Audio codecs
        if (version >= 3) {
            supportedAudioCodecs.push("vorbis");
        }
        if (version >= 15) {
            supportedAudioCodecs.push("opus");
        }
        if (version >= 51) {
            supportedAudioCodecs.push("flac");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "firefox");
    }
}

module.exports = Firefox;