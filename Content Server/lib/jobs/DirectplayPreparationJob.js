const Logger = require('../logger.js');
const MovieMetadata = require('../metadata/movieMetadata.js');
const TvMetadata = require('../metadata/tvMetadata.js');
const HlsManager = require('../hls/HlsManager.js');
const Transcoding = require('../hls/transcoding.js');
const Episode = require('../media/Episode.js');
const Movie = require('../media/Movie.js');
const Job = require('./Job.js');
const fs = require('fs');

const logger = new Logger();

class DirectplayPreparationJob extends Job {
    constructor(interval, runAtStart=false) {
        super(interval, runAtStart);
        this.running = false;
    }

    prepareDirectplay(metadata) {
        return new Promise(resolve => {
            const isMovie = metadata.getType() === "movie";
            metadata.getDirectplayHandlingNeeded()
            .then(async candidates => {
                const hlsManager = new HlsManager();
                const gotCandidates = candidates.length > 0;
                if (gotCandidates) {
                    logger.INFO(`Preparing ${candidates.length} file(s) for directplay (type: ${metadata.getType()})`);
                } else {
                    logger.DEBUG(`No files to prepare for directplay (type: ${metadata.getType()})`);
                }
                while (candidates.length > 0) {
                    const promises = [];
                    // Create m3u8 files for each candidate, max SIMULTANEOUS_DIRECTPLAY_PREPARE_LIMIT at a time
                    for (let i = 0; i < Transcoding.SIMULTANEOUS_DIRECTPLAY_PREPARE_LIMIT && candidates.length > 0; i++) {
                        const dbObject = candidates.pop();
                        const content = isMovie ? new Movie(dbObject.movie_id) : new Episode(dbObject.episode_id);
                        promises.push(hlsManager.prepareDirectplay(content));
                    }
                    try {
                        const files = await Promise.all(promises);
    
                        // Save that we have prepared the files and move the m3u8 file to the correct folder
                        for (let file of files) {
                            metadata.setDirectplayReady(file.id);
                            const content = isMovie ? new Movie(file.id) : new Episode(file.id);
                            const m3u8Path = await content.getM3u8Path();
    
                            fs.copyFile(file.hlsFile, m3u8Path, (err) => {
                                if (err) {
                                    logger.ERROR(`Error while moving m3u8 file: ${err}`);
                                } else {
                                    fs.rm(file.output, {recursive: true, force: true}, (err) => {
                                        if (err) {
                                            logger.ERROR(`Error removing directplay preparation temp-path`);
                                            logger.ERROR(err);
                                        }
                                    });
                                }
                            });
                        }
                        logger.DEBUG(`Finished preparing ${files.length} file(s) for directplay, ${candidates.length} file(s) left`);
                    } catch (failedFile) {
                        metadata.setDirectplayFailed(failedFile.id);
                        logger.ERROR(`Error preparing file(s) for directplay. Will mark as failed and continue with next one.`);
                    }
                }
                if (gotCandidates) {
                    logger.INFO(`Finished preparing all files for directplay`);
                }
                resolve();
            });
        });
    }

    startJob() {
        if (this.runAtStart) {
            this.#runJob();
        }

        this.timer = setInterval(this.#runJob.bind(this), this.interval);
    }

    async #runJob() {
        if (!this.running) {
            this.running = true;
            const showMetadata = new TvMetadata();
            await this.prepareDirectplay(showMetadata);
            const movieMetadata = new MovieMetadata();
            await this.prepareDirectplay(movieMetadata);
            this.running = false;
        }
    }
}

module.exports = DirectplayPreparationJob;