import fetch from 'node-fetch';

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const jwtSecret = 'SERVERSECRET';
const jwt = require('jsonwebtoken');

export default (req, res) => {
    return new Promise(async (resolve) => {
        let movieID = req.query.movie;
        let poster = req.query.poster;
        let backdrop = req.query.backdrop;
        console.log(movieID);
        console.log(poster);
        console.log(backdrop);
        res = cors(res);

        // TODO: Error handling when imageID or movieID does not exist
        await db.none('UPDATE movie_image SET active = false WHERE movie_id = $1', [movieID]);
        if (poster != null) {
            db.none('UPDATE movie_image SET active = true WHERE movie_id = $1 AND image_id = $2', [movieID, poster]);
        }
        if (backdrop != null) {
            db.none('UPDATE movie_image SET active = true WHERE movie_id = $1 AND image_id = $2', [movieID, backdrop]);
        }
        res.status(200).json({success: true});
        resolve();
    });
}
