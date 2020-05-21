import fetch from 'node-fetch';

const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const jwtSecret = 'SERVERSECRET';
const jwt = require('jsonwebtoken');
const MovieMetadata = require('../../../lib/metadata/movieMetadata');


const metadata = new MovieMetadata();


export default (req, res) => {
    return new Promise(resolve => {
        let search = req.query.search;
        res = cors(res);

        fetch(`${metadata.getAPIUrl()}/search/movie?api_key=${metadata.getAPIKey()}&language=en-US&query=${search}&page=1&include_adult=true`)
        .then(r => r.json())
        .then(json => {
            res.status(200).json(json.results);
            resolve();
        });
    });
}
