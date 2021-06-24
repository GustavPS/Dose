import fetch from 'node-fetch';

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const MovieMetadata = require('../../../../lib/metadata/movieMetadata');




export default (req, res) => {
    return new Promise(resolve => {
        let serieID = req.query.serie;
        res = cors(res);

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        // TODO: Error handling when metadatID does not exist

        db.any('SELECT serie_image.type, serie_image.active, image.path, image.id FROM serie_image, image WHERE serie_image.image_id = image.id AND serie_image.serie_id = $1', [serieID]).then(result => {
            res.status(200).json(result);
            resolve();
        });
    });
}
