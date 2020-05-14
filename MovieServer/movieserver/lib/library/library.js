var ffmpeg = require('fluent-ffmpeg');


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
    }

    getPath() {
        return this.path;
    }
    getName() {
        return this.name;
    }

    newEntry(path) {
        throw('newEntry must be implemented.');
    }
    removeEntry(path) {
        throw('removeEntry must be implemented.');
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
        }
        return {
            name: name,
            type: type
        }
    }
}

module.exports = Library;