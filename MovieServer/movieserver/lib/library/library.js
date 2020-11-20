var ffmpeg = require('fluent-ffmpeg');
const pathLib = require('path');
const fs = require('fs');
const glob = require('glob');


const MOVIE_FORMATS = [
    'mp4', 'ts', 'mkv', 'webm', 'avi', 'm4v'
];
const SUB_FORMATS = [
    'srt', 'vtt', 'sub'
]

var AsyncLock = require('async-lock');

class Library {
    constructor(name, path, id, metadata) {
        this.name = name;
        this.path = path;
        this.id = id;
        this.metadata = metadata;
        this.lock = new AsyncLock();
        /*
        this.subLanguages = [
            {
                shortName: 'eng',
                longName: 'English'
            },
            {
                shortName: 'swe',
                longName: 'Swedish'
            },
            {
                shortName: 'ara',
                longName: 'Arabic'
            },
            {
                shortName: 'chi',
                longName: 'Chinese'
            },
            {
                shortName: 'fre',
                longName: 'French'
            },
            {
                shortName: 'pol',
                longName: 'Polish'
            }, {
                shortName: 'unknown',
                longName: 'Unknown'
            }
        ]
        */
    }

    async findAudioStreams(name, path) {
        return new Promise(resolve => {
            let fullPath = pathLib.join(this.path, path);
            ffmpeg.ffprobe(fullPath, (err, metadata) => {
                if (err) {
                    resolve(false);
                    return;
                }
                let audio_streams = [];
                for (let stream of metadata.streams) {
                    if (stream.codec_type === 'audio') {
                        if (stream.tags != undefined && stream.tags.language != undefined) {
                            audio_streams.push({
                                language: stream.tags.language,
                                stream: stream.index
                            });
                        } else {
                            audio_streams.push({
                                language: 'Unknown',
                                stream: stream.index
                            });
                        }

                    }
                }
                if (audio_streams.length === 0) {
                    audio_streams.push({
                        language: 'Unknown',
                        stream: -1
                    });
                }
                resolve(audio_streams);
            });
        });
    }

    /**
     * Get all the SRT content of a videofile and save them to SRT files with the correct language name.
     * 
     * @param {string} name - Name of the show/movie 
     * @param {string} path - Path to the episode/movie
     * @param {string} episodeNumber - If a episode is provided, this is the episode number
     * @param {string} seasonNumber - If a episode is provided, this is the episodes season
     */
    async convertSubtitles(name, path, episodeNumber = "", seasonNumber = "") {
        return new Promise(resolve => {
            let fullPath = pathLib.join(this.path, path);
            let t = this;
            let shouldExtractSubs = true;

            // Don't extract if we have already extracted sub(s) from this video
            console.log(pathLib.dirname(fullPath))
            fs.readdirSync(pathLib.dirname(fullPath)).forEach(file => {
                if (file.includes("EXTRACTED") && file.includes(".srt")) {
                    if ((episodeNumber != "" && seasonNumber != "" && file.includes(`S${seasonNumber}E${episodeNumber}`)) ||
                    episodeNumber == "" && seasonNumber == "") {
                        console.log(` > Found already extracted subtitles for this show, will use those instead. (To extract new files, create a new folder and put the video-file there)`);
                        shouldExtractSubs = false;
                        resolve(true);
                        return;
                    }
                }
                console.log(file);
            });


            if (shouldExtractSubs) {
                ffmpeg
                .ffprobe(fullPath, function(err, metadata) {
                    if (err) {
                        //console.log(err);
                        // TODO: Only resolve with false if the error is because it's bussy, else throw the error
                        resolve(false);
                        return;
                    }
                    let found = false;
                    for (let stream of metadata.streams) {
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
                                })
                                .on('error', function(err, stdout, stderr) {
                                    console.log('an error happened converting subtitle: ' + err.message);
                                    console.log(stdout);
                                    console.log(stderr);
                                    done(true);
                                })
                                .on('progress', function(progress) {
                                    process.stdout.write(` > Found a subtitle (${stream.tags.language}) for ${name}. Converting it now. - ${progress.percent}% \r`);
                                })
                                .on('end', function(stdout, stderr) {
                                    console.log(` > Found a subtitle (${stream.tags.language}) for ${name}. Converting it now. - 100% (done)                            `);
                                    done(true);
                                })
                                .run();
                            }, function(status) {
                                resolve(status);
                            });
    
                        }
                    }
                    if (!found) {
                        console.log(` > No subtitles found in ${name}`);
                        resolve(true);
                    }
                });
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

    nameMatch(name) {
        let re = new RegExp("([ .\\w'!-]+?)(\\W\\d{4}\\W?.*)", 'gm');
        let matches = re.exec(name)
        if (matches != null && matches.length >= 2) {
            name = matches[1];
            name = name.replace(/\./g, ' ');
            name = name.trim();
        }
        return name;
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

        let re = new RegExp("([ .\\w'!-]+?)(\\W\\d{4}\\W?.*)", 'gm');
        let matches = re.exec(name)
        if (matches != null && matches.length >= 2) {
            name = matches[1];
            name = name.replace(/\./g, ' ');
            name = name.trim();
        }

        // Get the folder name (for subtitles)
        let parentFolder =  pathLib.dirname(path);

        return {
            name: name,
            type: type,
            parentFolder: parentFolder
        }
    }
}

module.exports = Library;