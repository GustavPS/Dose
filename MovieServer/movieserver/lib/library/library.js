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
}

module.exports = Library;