import fetch from 'node-fetch';

const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const MovieMetadata = require('../../../lib/metadata/movieMetadata');
const validateUser = require('../../../lib/validateUser');


const metadata = new MovieMetadata();


export default (req, res) => {
    return new Promise(resolve => {
        let search = req.query.search;
        res = cors(res);

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        fetch(`${metadata.getAPIUrl()}/search/movie?api_key=${metadata.getAPIKey()}&language=en-US&query=${search}&page=1&include_adult=true`)
        .then(r => r.json())
        .then(json => {
            res.status(200).json(json.results);
            resolve();
        });
    });
}
