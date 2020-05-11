const Metadata = require('./metadata');
const fetch = require('node-fetch');

class TvMetadata extends Metadata {
    constructor() {
        super();
    }

    /*
    getMetadata(movieName) {
        fetch(`${this.getAPIUrl()}/search/movie?api_key=${this.getAPIKey()}&language=en-US&query=${movieName}&page=1&include_adult=true`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
        });
    }
    */
}

module.exports = TvMetadata;