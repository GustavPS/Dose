const Browser = require('./browser');

class Iphone extends Browser {
    constructor(version) {
        let supportedVideoCodecs = ["h264", "ogg"];
        let supportedAudioCodecs = ["aac", "mp3"];

        super(version, supportedVideoCodecs, supportedAudioCodecs, "iphone");
    }
}

module.exports = Iphone;