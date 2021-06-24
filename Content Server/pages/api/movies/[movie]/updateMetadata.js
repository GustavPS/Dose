import fetch from 'node-fetch';

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const MovieMetadata = require('../../../../lib/metadata/movieMetadata');
const validateUser = require('../../../../lib/validateUser');

const metadataObj = new MovieMetadata();


export default (req, res) => {
    return new Promise(resolve => {
        let metadataID = req.query.metadataID;
        let movieID = req.query.movie;
        res = cors(res);

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        // TODO: Error handling when metadatID does not exist

        // Get the details about the selected metadata
        fetch(`${metadataObj.getAPIUrl()}/movie/${metadataID}?api_key=${metadataObj.getAPIKey()}&language=en-US`)
        .then(res => res.json())
        .then(metadata => {
            // Get all the images for the new metadata
            metadataObj.getImages(metadataID)
            .then(images => {
                let active = true;
                for (let image of images.backdrops) {
                    image.active = active;
                    active = false;
                }
                active = true;
                for (let image of images.posters) {
                    image.active = active;
                    active = false;
                }


                // Get the trailer for the new metadata
                metadataObj.getTrailer(metadataID).then(async (trailer) => {
                    // TODO: Remove the old images from the image table
                    // Remove the old metadata
                    await db.none('DELETE FROM movie_metadata WHERE movie_id = $1', [movieID]);
                    await db.none('DELETE FROM movie_category WHERE movie_id = $1', [movieID]);
                    await db.none('DELETE FROM movie_image WHERE movie_id = $1', [movieID]);
                    // Inser the new metadata
                    metadataObj.insertMetadata(metadata, images, trailer, movieID);
                    res.status(200).json({success: true});
                    resolve();
                });
            });
        });
    });
}
