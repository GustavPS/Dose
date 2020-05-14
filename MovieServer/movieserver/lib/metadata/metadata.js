
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

    getDummyMetadata(movieName) {
        return {
            adult: false,
            backdrop_path: '',
            belongs_to_collection: {
              id: -1,
              name: '',
              poster_path: '',
              backdrop_path: ''
            },
            budget: -1,
            genres: [],
            homepage: '',
            id: -1,
            imdb_id: '-1',
            original_language: 'en',
            original_title: movieName,
            overview: "",
            popularity: -1,
            poster_path: '',
            production_companies: [
              {
                id: -1,
                logo_path: '',
                name: '',
                origin_country: ''
              }
            ],
            production_countries: [ { iso_3166_1: '', name: '' } ],
            release_date: '1970-01-01',
            revenue: -1,
            runtime: -1,
            spoken_languages: [ { iso_639_1: '', name: '' } ],
            status: '',
            tagline: '',
            title: movieName,
            video: false,
            vote_average: -1,
            vote_count: -1
          }
    }
}

module.exports = Metadata;