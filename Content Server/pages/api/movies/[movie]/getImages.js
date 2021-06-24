import fetch from 'node-fetch';

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const MovieMetadata = require('../../../../lib/metadata/movieMetadata');
const validateUser = require('../../../../lib/validateUser');


const metadataObj = new MovieMetadata();


export default (req, res) => {
    return new Promise(resolve => {
        let movieID = req.query.movie;
        res = cors(res);

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        // TODO: Error handling when metadatID does not exist

        db.any('SELECT movie_image.type, movie_image.active, image.path, image.id FROM movie_image, image WHERE movie_image.image_id = image.id AND movie_image.movie_id = $1', [movieID]).then(result => {
            res.status(200).json(result);
            resolve();
        });
    });
}
