const Logger = require('../logger.js');
const MovieMetadata = require('../metadata/movieMetadata.js');
const TvMetadata = require('../metadata/tvMetadata.js');
const HlsManager = require('../hls/HlsManager.js');
const Transcoding = require('../hls/transcoding.js');
const Episode = require('../media/Episode.js');
const Movie = require('../media/Movie.js');
const Job = require('./Job.js');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const logger = new Logger();

class DirectplayPreparationJob extends Job {
    constructor(interval, runAtStart=false) {
        super(interval, runAtStart);
        this.running = false;
    }

    convertToAac(filePath) {
        return new Promise((resolve, reject) => {
            const output = path.join(Transcoding.TEMP_FOLDER, path.basename(filePath))
            ffmpeg(filePath)
            .withVideoCodec('copy')
            .withAudioCodec('aac')
            .inputOptions([
                '-threads 4'
            ])
            .outputOptions([
                '-map 0',
                '-map -v',
                '-map V',
                '-c:s copy',
            ])
            .on('end', () => {
                resolve(output);
            })
            .on('error', (err, stdout, stderr) => {
                reject({
                    err: err,
                    stdout: stdout,
                    stderr: stderr
                })
            })
            .output(output)
            .run();
        });
    }

    getStreams(path) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(path, (err, metadata) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(metadata.streams);
            });
        });
    }

    findAudioStreams(streams) {
        const audioStreams = [];
        for (let stream of streams) {
            if (stream.codec_type === 'audio') {
                if (stream.tags != undefined && stream.tags.language != undefined) {
                    audioStreams.push({
                        language: stream.tags.language,
                        codec: stream.codec_name,
                        stream: stream.index
                    });
                } else {
                    audioStreams.push({
                        language: 'Unknown',
                        codec: stream.codec_name,
                        stream: stream.index
                    });
                }

            }
        }
        if (audioStreams.length === 0) {
            audioStreams.push({
                language: 'Unknown',
                codec: 'Unknown',
                stream: -1
            });
        }
        return audioStreams;
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

                let counter = 0;
                for (const candidate of candidates) {
                    const content = isMovie ? new Movie(candidate.movie_id) : new Episode(candidate.episode_id);
                    const filePath = await content.getFilePath();
                    try {
                        const output = await this.convertToAac(filePath);
                        fs.copyFile(output, filePath, (err) => {
                            if (err) {
                                metadata.setDirectplayFailed(content.id);
                                logger.ERROR(`Error copying file after directplay convertion: ${err}`);
                                console.log(err);
                            } else {
                                fs.unlink(output, (err) => {
                                    if (err) {
                                        logger.ERROR(`Error removing file after directplay convertion:${err}`);
                                        console.log(err);
                                    }
                                });
                                // Get streams from video
                                this.getStreams(filePath).then(streams => {
                                    // Get audio streams
                                    const audioStreams = this.findAudioStreams(streams);
                                    content.removeAllLanguages();
                                    const promises = [];
                                    // Store the audio streams to the database
                                    for (const stream of audioStreams) {
                                        promises.push(content.addLanguage(stream.language, stream.stream, stream.codec));
                                    }

                                    Promise.all(promises).then(() => {
                                        metadata.setDirectplayReady(content.id);
                                        logger.DEBUG(`Finished preparing a file for directplay, ${candidates.length - counter} file(s) left`);
                                    }).catch(err => {
                                        metadata.setDirectplayFailed(content.id);
                                        logger.ERROR(`Error adding languages to content: ${err}`);
                                        console.log(err);
                                    });
                                });
                               
                            }
                        });
                    } catch (err) {
                        metadata.setDirectplayFailed(content.id);
                        console.log(err.err);
                        console.log(err.stdout);
                        console.log(err.stderr)
                        logger.ERROR(`Error converting file: ${filePath}`);
                    }
                    counter++;
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