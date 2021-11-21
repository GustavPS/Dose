
class Metadata {
    constructor(metadataHandler) {
        this.metadata = metadataHandler;
        this.API_URL = "https://api.themoviedb.org/3";
        this.API_KEY = "19065a8218d4c104a51afcc3e2a9b971";
    }

    getType() {
        throw('getType must be implemented');
    }

    /**
     * Returns the API url
     * 
     * @returns string
     */
    getAPIUrl() {
        return this.API_URL;
    }

    /**
     * Returns the API key
     * 
     * @returns string
     */
    getAPIKey() {
        return this.API_KEY;
    }

    getBadImages() {
        throw('getBadImages must be implemented');
    }

    updateImages(content) {
        throw('updateImages must be implemented');
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

    /**
     * Returns a dummy metadata object
     * 
     * @param {string} movieName The movie name
     * @returns JSON object
     */
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
            vote_count: -1,
            first_air_date: -1
          }
    }

    /**
     * Returns a dummy actor object
     * 
     * @returns JSON object
     */
    getDummyActor() {
        return {
            id: -1,
            name: 'Unknown',
            character: 'Unknown',
            profile_path: 'no_image',
            order: 0
        };
    }

    /**
     * Returns a dummy genre object
     * 
     * @returns JSON object
     */
    getDummyGenre() {
        return {
            id: -1,
            name: 'other'
        }
    }

    /**
     * Returns a dummy image object
     * 
     * @returns JSON object
     */
    getDummyImage() {
        return {
            file_path: 'no_image',
            active: true
        };
    }
}

module.exports = Metadata;