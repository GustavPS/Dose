var ffmpeg = require('fluent-ffmpeg');


const FORMATS = [
    'mp4', 'ts', 'mkv', 'webm', 'avi'
];

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

    cleanName(path) {
        let fileExtension = path.substring(path.lastIndexOf('.') + 1);
        if (!FORMATS.includes(fileExtension)) {
            throw({
                name: 'UnsupportedFormat',
                message: `Movie format unsupported (${fileExtension})`
            });
        }

        let movieName = path.substr(0, path.lastIndexOf('.'));
        movieName = movieName.substring(movieName.lastIndexOf("/") + 1);
        movieName = movieName.substring(movieName.lastIndexOf("\\") + 1);

        let re = new RegExp("([ .\\w'!-]+?)(\\W\\d{4}\\W?.*)", 'gm');
        let matches = re.exec(movieName)
        if (matches != null && matches.length >= 2) {
            movieName = matches[1];
            movieName = movieName.replace(/\./g, ' ');
        }
        return movieName;
    }
}

module.exports = Library;