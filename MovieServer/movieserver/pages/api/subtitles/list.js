const db = require('../../../lib/db');

export default (req, res) => {
    return new Promise(resolve => {
        let movieID = req.query.movie;
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
    
        db.any('SELECT id, language FROM subtitle WHERE movie_id = $1', [movieID]).then(subtitles => {
            res.status(200).json({
                subtitles: subtitles
            });
            resolve();
        })
    });
}