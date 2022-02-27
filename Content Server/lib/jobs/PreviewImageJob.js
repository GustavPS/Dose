const Job = require('./Job.js');
const MovieMetadata = require('../metadata/movieMetadata.js');
const TvMetadata = require('../metadata/tvMetadata.js');

const Episode = require('../media/Episode.js');
const Movie = require('../media/Movie.js');
const Logger = require('../logger.js');
const ffmpeg = require('fluent-ffmpeg');

const util = require('util');


const path = require('path');
var fs = require('fs');
const fsExists = util.promisify(fs.exists)
const fsMkdir = util.promisify(fs.mkdir)


const logger = new Logger();


class PreviewImageJob extends Job {
    constructor(interval, runAtStart=false) {
        super(interval, runAtStart);
        this.running = false;
    }

    startJob() {
        if (this.runAtStart) {
            this.#runJob();
        }

        this.timer = setInterval(this.#runJob.bind(this), this.interval);
    }

    async extractImages(input_path, episode_number=undefined) {
        let output_dir = path.dirname(input_path)
        let output_file = "";
        if (episode_number == undefined) {
            output_dir += "/preview_images"
            output_file = output_dir + "/img%04d.jpg";
        } else {
            output_dir += "/preview_images/e" + episode_number
            output_file = output_dir + "/img%04d.jpg";
        }
        if (await fsExists(output_dir)) {
            logger.DEBUG('Directory exists!');
        } else {
            logger.DEBUG('Directory not found. Creatin it');
            await fsMkdir(output_dir, { recursive: true });
        }
        return new Promise((resolve, reject) => {

            ffmpeg(input_path)
            .outputOptions([
                '-s 256x144',
                '-r 0.1' 
            ])
            .on('end', () => {
                resolve(output_file);
            })
            .on('error', (err, stdout, stderr) => {
                reject({
                    err: err,
                    stdout: stdout,
                    stderr: stderr
                })
            })
            .output(output_file)
            .run();
        });
    }

    extractPreviewImages(metadata) {
        return new Promise(resolve => {
            const isMovie = metadata.getType() === "movie";
            metadata.getPreviewHandlingNeeded()
            .then(async candidates => {
                const gotCandidates = candidates.length > 0;
                if (gotCandidates) {
                    logger.INFO(`Extracting preview images from ${candidates.length} file(s) (type: ${metadata.getType()})`);
                } else {
                    logger.DEBUG(`No files to extract preview from (type: ${metadata.getType()})`);
                }

                for (const candidate of candidates) {
                    const content = isMovie ? new Movie(candidate.movie_id) : new Episode(candidate.episode_id);
                    const filePath = await content.getFilePath();
                    try {
                        if (isMovie) {
                            await this.extractImages(filePath);
                        } else {
                            await this.extractImages(filePath, candidate.episode_number);
                        }
                        metadata.setPreviewExtracted(content.id);
                    } catch (err) {
                        logger.ERROR(err.err);
                        logger.INFO(err.stdout);
                        logger.ERROR(err.stderr)
                        logger.ERROR(`Error extracting images from file: ${filePath}`);
                        metadata.setPreviewExtractionFailed(content.id);
                    }
                }
                if (gotCandidates) {
                    logger.INFO(`Finished extracting images from all files (type: ${metadata.getType()})`);
                }
                resolve();
            });
        });
    }

    async #runJob() {
        if (!this.running) {
            this.running = true;
            const showMetadata = new TvMetadata();
            await this.extractPreviewImages(showMetadata);
            const movieMetadata = new MovieMetadata();
            await this.extractPreviewImages(movieMetadata);
            this.running = false;
        }
    }
}

module.exports = PreviewImageJob;