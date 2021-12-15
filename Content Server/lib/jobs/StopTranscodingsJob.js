const Job = require('./Job.js');
const HlsManager = require('../hls/HlsManager.js');

class StopTranscodingsJob extends Job {
    constructor(interval, runAtStart=false) {
        super(interval, runAtStart);
    }

    startJob() {
        if (this.runAtStart) {
            this.#runJob();
        }

        this.timer = setInterval(this.#runJob.bind(this), this.interval);
    }

    #runJob() {
        const hlsManager = new HlsManager();
        hlsManager.stopOldTranscodings();
    }
}

module.exports = StopTranscodingsJob;