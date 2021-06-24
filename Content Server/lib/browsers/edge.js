const Browser = require('./browser');

class Edge extends Browser {
    constructor(version) {
        let supportedVideoCodecs = ["theora", "ogg"];
        let supportedAudioCodecs = ["aac", "flac", "mp3"];

        // Video codecs
        if (version >= 12) {
            supportedVideoCodecs.push("avc");
            supportedVideoCodecs.push("h264");
        }
        if (version >= 14) {
            supportedVideoCodecs.push("vp8");
            supportedVideoCodecs.push("vp9");
        }
        if (version >= 18) {
            supportedVideoCodecs.push("hevc");
            supportedVideoCodecs.push("h265");
        }
        if (version >= 75) {
            supportedVideoCodecs.push("av1");
        }

        // Audio codecs
        if (version >= 14) {
            supportedAudioCodecs.push("opus");
        }
        if (version >= 17) {
            supportedAudioCodecs.push("vorbis");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "edge");
    }
}

module.exports = Edge;