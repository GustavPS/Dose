class Job {
    constructor(interval, runAtStart) {
        this.interval = interval;
        this.runAtStart = runAtStart;
    }

    startJob() {
        throw new Error('startJob() must be implemented');
    }

    #runJob() {
        throw new Error('runJob() must be implemented');
    }
}

module.exports = Job;