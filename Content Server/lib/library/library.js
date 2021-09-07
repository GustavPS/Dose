var ffmpeg = require('fluent-ffmpeg');
const pathLib = require('path');
const fs = require('fs');
const glob = require('glob');
const Resolution = require('../resolution');
const LANGUAGE_LIST = require('../../lib/languages');
const ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
const eol = require("eol")
const Logger = require('../logger');
const logger = new Logger().getInstance();



const MOVIE_FORMATS = [
    'mp4', 'ts', 'mkv', 'webm', 'avi', 'm4v'
];
const SUB_FORMATS = [
    'srt', 'vtt', 'sub'
]

var AsyncLock = require('async-lock');
const { rejects } = require('assert');

class Library {
    constructor(name, path, id, metadata) {
        this.name = name;
        this.path = path;
        this.id = id;
        this.metadata = metadata;
        this.lock = new AsyncLock();
        this.awaitingSubtitles = [];
    }

    async findAudioStreams(streams) {
        let audioStreams = [];
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

    /**
     * Get all the video/audio/subtitle streams from a video file
     * 
     * @param {string} path - relative path to the file
     * @returns {Promise}
     */
    async getFileStreams(path) {
        return new Promise(resolve => {
            const fullPath = pathLib.join(this.path, path);
            ffmpeg.ffprobe(fullPath, (err, metadata) => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(metadata.streams);
            });
        });
    }

    /**
     * 
     * @param {array} streams - a list of all the video file streams
     * @returns {Resolution}
     */
    getResolutions(streams) {
        let resolution = new Resolution();
        for (let stream of streams) {
            if (stream.codec_type === "video") {
                let width = stream.width;

                if (width >= 426) {
                    resolution.p240 = true;
                }
                if (width >= 480) {
                    resolution.p360 = true;
                }
                if (width >= 640) {
                    resolution.p480 = true;
                }
                if (width >= 1280) {
                    resolution.p720 = true;
                }
                if (width >= 1920) {
                    resolution.p1080 = true;
                }
                if (width >= 2560) {
                    resolution.p1440 = true;
                }
                if (width >= 3840) {
                    resolution.p4k = true;
                }
                if (width >= 7680) {
                    resolution.p8k = true;
                }
                resolution.codec = stream.codec_name;
                break;
            }
        }
        return resolution;
    }

    /**
     * Get all the SRT content of a videofile and save them to SRT files with the correct language name.
     * 
     * @param {string} name - Name of the show/movie 
     * @param {string} path - Path to the episode/movie
     * @param {string} episodeNumber - If a episode is provided, this is the episode number
     * @param {string} seasonNumber - If a episode is provided, this is the episodes season
     */
    async convertSubtitles(name, path, streams, episodeNumber = "", seasonNumber = "") {
        // TODO: Change default episode/season to something else then an empty string
        return new Promise(resolve => {
            let fullPath = pathLib.join(this.path, path);
            let t = this;
            let shouldExtractSubs = true;

            // Don't extract if we have already extracted sub(s) from this video
            fs.readdirSync(pathLib.dirname(fullPath)).forEach(file => {
                if (file.includes("EXTRACTED") && file.includes(".srt")) {
                    if ((episodeNumber != "" && seasonNumber != "" && file.includes(`S${seasonNumber}E${episodeNumber}`)) ||
                    episodeNumber == "" && seasonNumber == "") {
                        shouldExtractSubs = false;
                        resolve(true);
                        return;
                    }
                }
            });


            if (shouldExtractSubs) {
                let found = false;
                for (let stream of streams) {
                    if (stream.codec_type == 'subtitle' && stream.codec_name == 'subrip' && stream.tags != undefined && ['eng', 'swe'].includes(stream.tags.language)) {
                        found = true;
                        let outputPath = pathLib.join(pathLib.dirname(fullPath), `S${seasonNumber}E${episodeNumber}_${stream.tags.language}_EXTRACTED_${Math.floor(Math.random() * 1000000000)}.srt`); // TODO: Check if this file exist first
                        
                        t.lock.acquire("subconvert", async function(done) {
                            ffmpeg(fullPath)
                            .noAudio()
                            .noVideo()
                            .inputOption([
                                '-threads 3'
                            ])
                            .outputOption([
                                `-map 0:${stream.index}`,
                                '-c copy'
                            ])
                            .output(outputPath)
                            .on('start', function(commandLine) {
                                logger.DEBUG(`Extract sub command: ${commandLine}`);
                                logger.INFO(`Found a subtitle (${stream.tags.language}) for ${name}. Converting it now..`);
                            })
                            .on('error', function(err, stdout, stderr) {
                                logger.ERROR('An error happened converting subtitle: ' + err.message);
                                logger.ERROR(stdout);
                                logger.ERROR(stderr);
                                done(true);
                            })
                            .on('progress', function(progress) {
                            })
                            .on('end', function(stdout, stderr) {
                                done(true);
                            })
                            .run();
                        }, function(status) {
                            resolve(status);
                        });

                    }
                }
                if (!found) {
                    logger.INFO(`No subtitles found in ${name}`);
                    resolve(true);
                }
            } else {
                resolve(true);
            }

        })
    }

    getPath() {
        return this.path;
    }
    getName() {
        return this.name;
    }

    getType() {
        throw('getType must be implemented.')
    }

    newEntry(path) {
        throw('newEntry must be implemented.');
    }
    removeEntry(path) {
        throw('removeEntry must be implemented.');
    }

    /**
     * Download and save the trailer for a movie/show. NOTE: Only tested for movies
     * 
     * @param {string} trailer  Youtube link to trailer
     * @param {string} name Name of movie/show
     * @param {string} savePath Path to movie/show
     * @returns 
     */
    downloadTrailer(trailer, name, savePath) {
        let folderPath = pathLib.dirname(savePath);
        let fullPath = pathLib.join(this.path, folderPath);
        return new Promise(async (resolve) => {
            let shouldDownload = true;
            // Don't download if we have already downloaded the trailer
            fs.readdirSync(fullPath).forEach(file => {
                if (file.includes("_downloaded_trailer") && file.includes(".mp4")) {
                    shouldDownload = false;
                    if (!file.includes("_not_cropted")) {
                        resolve(pathLib.join(folderPath, `${name}_downloaded_trailer.mp4`));
                    } else {
                        resolve(false);
                    }
                    return;
                }
            });

            if (trailer == null || trailer == undefined || trailer == "") {
                shouldDownload = false;
                resolve(false);
                return;
            }

            if (shouldDownload) {
                let path = pathLib.join(fullPath, `${name}_downloaded_trailer_not_cropted.mp4`);
                //const info = await ytdl.getInfo(trailer);
                const maxAttempts = 20;
                let ignoreThrottling = false;
                let currentAttempts = 1;
                const startDownload = () => {
                    let starttime = null;
                    const download = ytdl("https://www.youtube.com/watch?v=" + trailer, {quality: 'highestvideo', filter: format => format.container === 'mp4'});
                    download.pipe(fs.createWriteStream(path));
                    download.once("response", () => {
                        starttime = Date.now();
                    });
                    download.on("progress", (chunkLength, downloaded, total) => {
                        const percent = downloaded / total;
                        const downloaded_minutes = (Date.now() - starttime) / 1000 / 60;
                        const estimated_download_time = downloaded_minutes / percent - downloaded_minutes;
                
                        // if the estimated download time is more than 2 minutes then we cancel and restart the download, this value works fine for me but you may need to change it based on your server/internet speed.
                        if (estimated_download_time.toFixed(2) >= 2) {
                            if (currentAttempts++ >= maxAttempts && !ignoreThrottling) {
                                logger.WARNING(`Youtube is throttling, but have already tried ${maxAttempts} times, continuing..`);
                                ignoreThrottling = true;
                            } else if (!ignoreThrottling) {
                                logger.WARNING("Seems like YouTube is limiting our download speed, restarting the download to mitigate the problem..");
                                download.destroy();
                                startDownload();
                            }
                        }
                    });
                    download.on('error', err => {
                        logger.ERROR(`Error downloading trailer: ${err}`);
                        download.destroy();
                        resolve(false);
                        return;
                    });

                    download.on('retry', (number, error) => {
                        logger.ERR(`Error downloading trailer! Retry: ${number}, Error: ${error}`);
                        download.destroy();
                        resolve(false);
                        return;
                    });

                    download.on('end', () => {
                        // TODO: Movie this to own function
                        let proc = ffmpeg(path).inputOptions([
                            '-ss 10'
                        ]).outputOptions([
                            '-vframes 500',
                            '-vf cropdetect',
                            '-f null'
                        ]).on('end', (stdout, stderr) => {
                            const lines = eol.split(stderr);
                            let crops = {};
    
                            lines.forEach(line => {
                                if (line.includes("crop=")) {
                                    let re = new RegExp("crop=(-?\\d+:-?\\d+:-?\\d+:-?\\d+)", 'gm');
                                    const matches = re.exec(line);
                                    if (matches != null && matches.length >= 2) {
                                        if (matches[1] in crops) {
                                            crops[matches[1]]++;
                                        } else {
                                            crops[matches[1]] = 1;
                                        }
                                    }
                                }
                            });
                            let maxKey, maxValue = 0;
                            for(const [key, value] of Object.entries(crops)) {
                                if(value > maxValue) {
                                  maxValue = value;
                                  maxKey = key;
                                }
                            }
                            // Remove all "-"
                            maxKey = maxKey.split('-').join('');
    
                            logger.DEBUG(`Removing black bars from trailer, using crop ${maxKey}`);
                            let cropProc = ffmpeg(path)
                            .inputOptions([
                                '-ss 10'
                            ])
                            .outputOptions([
                                `-vf crop=${maxKey}`,
                                '-c:a copy'
                            ]).output(pathLib.join(fullPath, `${name}_downloaded_trailer.mp4`))
                            .on('end', (stdout, stderr) => {
                                resolve(pathLib.join(folderPath, `${name}_downloaded_trailer.mp4`));
                                logger.INFO("Done!");
                                try {
                                    fs.unlinkSync(path)
                                    //file removed
                                  } catch(err) {
                                      logger.ERROR(err);
                                  }
                            })
                            .on('start', (cmd) => {
                                logger.DEBUG(`Remove black bars cmd: ${cmd}`);
                            })
                            .on('error', function(err, stdout, stderr) {
                                logger.ERROR(`Error removing black bars: ${err}`);
                                logger.ERROR(stdout);
                                logger.ERROR(stderr);
                                resolve(false);
                            }).run();
                        })
                        .on('start', (cmd) => {
                            logger.DEBUG(`Cropdetect cmd: ${cmd}`);
                        })
                        .on('error', function(err, stdout, stderr) {
                            logger.ERROR(`Error during cropdetect: ${err}`);
                            logger.ERROR(stdout);
                            logger.ERROR(stderr);
                            resolve(false);
                        })
                        .output("/dev/null").run();
                    });
                }
                startDownload();
            }
        });
    }

    isFileTrailer(name) {
        return name.includes("downloaded_trailer");
    }

    nameMatch(name) {
        let re = new RegExp("([& .A-zÀ-ú\\d_'()!-]+?)(\\W\\d{4}\\W?.*)", 'gm');
        let matches = re.exec(name)
        if (matches != null && matches.length >= 2) {
            name = matches[1];
            name = name.replace(/\./g, ' ');
            name = name.trim();
        }
        return name;
    }

    getReleaseYear(fileName) {
        let re = new RegExp("[\\.(](\\d{4})[\\.)]", "gm");
        let matches = re.exec(fileName);
        let possibleReleaseYear = [];
        if (matches != null && matches.length >= 2) {
            // First match includes dots, so skipp it
            for (let i = 1; i < matches.length; i++) {
                possibleReleaseYear.push(matches[i]); 
            }
        }
        return possibleReleaseYear;
    }

    cleanNameAndType(path) {
        let fileExtension = path.substring(path.lastIndexOf('.') + 1);
        if (!MOVIE_FORMATS.includes(fileExtension) && !SUB_FORMATS.includes(fileExtension)) {
            throw({
                name: 'UnsupportedFormat',
                message: `File format unsupported (${fileExtension})`
            });
        }

        let type = MOVIE_FORMATS.includes(fileExtension) ? 'MOVIE' : 'SUBTITLE'

        let name = path.substr(0, path.lastIndexOf('.'));
        name = name.substring(name.lastIndexOf("/") + 1);
        name = name.substring(name.lastIndexOf("\\") + 1);

        let possibleReleaseYear = this.getReleaseYear(name);
        name = this.nameMatch(name);

        // Get the folder name (for subtitles)
        let parentFolder =  pathLib.dirname(path);

        return {
            name: name,
            type: type,
            possibleReleaseYear: possibleReleaseYear,
            parentFolder: parentFolder
        }
    }

    getSubtitleInfo(fileName) {
        let subtitleInfo = {
            language: "Unknown",
            extracted: false,
            synced: false
        }
        subtitleInfo.synced = fileName.toString().toLocaleLowerCase().includes('_synced_') ||
                              fileName.toString().toLocaleLowerCase().includes('.synced.');
        subtitleInfo.extracted = fileName.toString().toLocaleLowerCase().includes('_extracted_') ||
                                 fileName.toString().toLocaleLowerCase().includes('.extracted.');

        for (let lang of LANGUAGE_LIST) {
            let foundLanguage = fileName.toString().toLocaleLowerCase().includes('_' + lang.shortName) ||
                                fileName.toString().toLocaleLowerCase().includes('.' + lang.shortName + ".");
            if (foundLanguage) {
                subtitleInfo.language = lang.longName;
                break;
            }
        }
        return subtitleInfo;
    }
}

module.exports = Library;
