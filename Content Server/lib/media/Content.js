class Content {
    getFilePath() {
        throw new Error('Not implemented');
    }

    getResolutions() {
        throw new Error('Not implemented');

    }

    getSubtitles() {
        throw new Error('Not implemented');

    }

    getAudioCodecs() {
        throw new Error('Not implemented');

    }

    getAudioCodecByStreamIndex(streamIndex) {
        throw new Error('Not implemented');
    }
}

module.exports = Content;