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
            }
        ]
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