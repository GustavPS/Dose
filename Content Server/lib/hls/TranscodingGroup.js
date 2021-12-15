
/**
 * @class TranscodingGroup
 * @classdesc TranscodingGroup is a class that represents a transcoding and its associated user aswell as the content being transcoded.
 */
class TranscodingGroup {
    constructor(user, content, group, fastTranscoding) {
        this.user = user;
        this.content = content;
        this.group = group;
        this.fastTranscoding = fastTranscoding;
        this.lastRequestedTime = Date.now();
        this.watchProgress = 0; // In procentage, 0-100

        // Will be set when the slow transcoding is started
        this.output = null;
        this.quality = null;
    }

    updateProgress(watchTime) {
        this.watchProgress = watchTime;
    }

    /**
     * 
     * @param {Transcoding} slowTranscoding - The slow transcoding to set 
     */
    addSlowTranscoding(slowTranscoding) {
        this.slowTranscoding = slowTranscoding;
    }

    /**
     * Get the content that is being transcoded.
     * 
     * @returns {Content} Returns the content that is being transcoded
     */
    getContent() {
        return this.content;
    }

    /**
     * 
     * @returns {String} Returns the output path of the transcoding
     */
    getOutputFolder() {
        return this.output;
    }

    /**
     * 
     * @returns {String} Returns the quality of the transcoding
     */
    getQuality() {
        return this.quality;
    }

    /**
     * Stop the transcoding process. (both fast and slow)
     */
    stop() {
        this.fastTranscoding.stop();
        if (this.slowTranscoding) {
            this.slowTranscoding.stop();
        }
    }

    /**
     * 
     * @returns {Number} - Returns the latests processed segment number
     */
    getLatestSegment() {
        if (this.slowTranscoding && this.slowTranscoding.latestSegment > this.fastTranscoding.latestSegment) {
            return this.slowTranscoding.latestSegment;
        }
        return this.fastTranscoding.latestSegment;
    }

    /**
     * 
     * @returns {Number} - Returns the first segment number
     */
    getStartSegment() {
        // The fast transcoding should always have the first segment number, but just to be sure
        if (this.slowTranscoding && this.slowTranscoding.startSegment < this.fastTranscoding.startSegment) {
            return this.slowTranscoding.startSegment;
        }
        return this.fastTranscoding.startSegment;
    }

    /**
     * Set the last requested time to the current time.
     */
    updateLastRequestedTime() {
        this.lastRequestedTime = Date.now();
    }

    /**
     * 
     * @returns {Boolean} Returns true if the transcoding is finished
     */
    isTranscodingFinished() {
        if (this.slowTranscoding) {
            return this.slowTranscoding.finished;
        } else {
            return this.fastTranscoding.finished;
        }
    }

    /**
     * 
     * @returns {Boolean} Returns true if the fast transcoding is still running
     */
    isFastStartRunning() {
        return !this.fastTranscoding.finished;
    }

    /**
     * Start the transcoding process. (both fast and slow)
     * 
     * @returns {Array} Returns an array of promises that will resolve when all transcodings is started
     */
    start(quality, output, audioStreamIndex, audioTranscoding) {
        this.output = output;
        this.quality = quality;

        let promises = [];
        promises.push(this.fastTranscoding.start(quality, output, audioStreamIndex, audioTranscoding));
        if (this.slowTranscoding) {
            promises.push(this.slowTranscoding.start(quality, output, audioStreamIndex, audioTranscoding));
        }
        return promises;
    }
}

module.exports = TranscodingGroup;