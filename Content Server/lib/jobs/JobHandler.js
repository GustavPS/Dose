const StopTranscodingsJob = require('./StopTranscodingsJob.js');
const MovieJob = require('./MovieJob.js');
const DirectplayPreparationJob = require('./DirectplayPreparationJob.js');
const PreviewImageJob = require('./PreviewImageJob.js');

class JobHandler {
    constructor() {
        this.jobs = [
            new StopTranscodingsJob(2000),
            new MovieJob(43200000, true), // 12 hours
            new DirectplayPreparationJob(1800000, true), // 30 minutes
            new PreviewImageJob(1800000, true) // 30 minutes
        ]
    }

    startAllJobs() {
        for (const job of this.jobs) {
            job.startJob();
        }
    }
}

module.exports = JobHandler;