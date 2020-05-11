const Library = require('./library');

class TvLibrary extends Library {

    /**
     * Creates a new instance of a TV library
     * 
     * @param {String} name - The name of the library
     * @param {String} path - The path of the library
     * @param {String} id - The id of the library
     * 
     */
    constructor(name, path, id) {
        super(name, path, id);
    }

    newEntry(path) {
        console.log("new TV entry");
    }
}

module.exports = TvLibrary;