const Browser = require('./browser');

class AndroidTV extends Browser {
    constructor(version) {
        let supportedVideoCodecs = ["h263", "h264", "avc", "mpeg", "mpeg-4", "mpeg-4 sp"];
        let supportedAudioCodecs = ["aac", "amr", "mp3", "midi", "pcm", "wave", "vorbis"];

        // Video codecs
        if (version >= 2.3) {
            supportedVideoCodecs.push("vp8")
        }
        if (version >= 4.4) {
            supportedVideoCodecs.push("vp9")
        }
        if (version >= 5) {
            supportedVideoCodecs.push("h265")
        }
        if (version >= 10) {
            supportedVideoCodecs.push("av1")
        }

        // Audio codecs
        if (version >= 3.1) {
            supportedAudioCodecs.push("flac");
        }
        if (version >= 5) {
            supportedAudioCodecs.push("opus");
        }
        if (version >= 9) {
            supportedAudioCodecs.push("xhe-aac");
        }

        super(version, supportedVideoCodecs, supportedAudioCodecs, "AndroidTV");
    }
}

module.exports = AndroidTV;