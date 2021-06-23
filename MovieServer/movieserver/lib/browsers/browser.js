// Abstract class
class Browser {
    constructor(version, videoCodecs, audioCodecs, type) {
        if (this.constructor == Browser) {
            throw new Error("Abstract classes can't be instantiated");
        }
        this.version = version;
        this.supportedVideoCodecs = videoCodecs;
        this.supportedAudioCodecs = audioCodecs;
        this.type = type;
    }

    getVersion() {
        return this.version;
    }

    videoCodecSupported(codec) {
        const supported = this.supportedVideoCodecs.includes(codec);
        console.log(`DEBUG: Video codec ${codec} for browser ${this.type} V${this.version} gave supported: ${supported}`);
        return supported;
    }
    
    audioCodecSupported(codec) {
        const supported = this.supportedAudioCodecs.includes(codec);
        console.log(`DEBUG: Audio codec ${codec} for browser ${this.type} V${this.version} gave supported: ${supported}`)
        return supported;
    }

    getType() {
        return this.type;
    }
}

module.exports = Browser;