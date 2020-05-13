
class Metadata {
    constructor(metadataHandler) {
        this.metadata = metadataHandler;
        this.API_URL = "https://api.themoviedb.org/3";
        this.API_KEY = "19065a8218d4c104a51afcc3e2a9b971";
    }

    getAPIUrl() {
        return this.API_URL;
    }
    getAPIKey() {
        return this.API_KEY;
    }

    getMetadata(name) {
        throw('getMetadata must be implemented');
    }

    insertMetadata(metadata, images, trailer, internalMovieID) {
        throw('insertMetadata must be implemented');
    }

    getImages(movieID) {
        throw('getImages must be implemented');
    }

    getTrailer(movieID) {
        throw('getTrailer must be implamented');
    }
}

module.exports = Metadata;