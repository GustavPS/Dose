var ffmpeg = require('fluent-ffmpeg');
const pathLib = require('path');


const MOVIE_FORMATS = [
    'mp4', 'ts', 'mkv', 'webm', 'avi'
];
const SUB_FORMATS = [
    'srt', 'vtt', 'sub'
]

class Library {
    constructor(name, path, id, metadata) {
        this.name = name;
        this.path = path;
        this.id = id;
        this.metadata = metadata;
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
            }
        ]
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
                    if (stream.codec_type == 'subtitle' && stream.codec_name == 'subrip' && stream.tags != undefined) {
                        found = true;
                        let outputPath = pathLib.join(pathLib.dirname(fullPath), `S${seasonNumber}E${episodeNumber}_${stream.tags.language}_EXTRACTED_${Math.floor(Math.random() * 1000000000)}.srt`); // TODO: Check if this file exist first
                        ffmpeg(fullPath)
                        .outputOption([
                            `-map 0:${stream.index}`
                        ])
                        .outputFormat('srt')
                        .output(outputPath)
                        .on('start', function(commandLine) {
                            console.log(` > Found a subtitle (${stream.tags.language}) for ${name}. Converting it now.`)
                        })
                        .on('error', function(err, stdout, stderr) {
                            console.log('an error happened converting subtitle: ' + err.message);
                            console.log(stdout);
                            console.log(stderr);
                        })
                        .run();
                    }
                }
                if (!found) {
                    console.log(` > No subtitles found in ${name}`);
                }
                resolve(true);
            });
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