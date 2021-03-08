const db = require('../../../lib/db');
const validateUser = require('../../../lib/validateUser');

export default (req, res) => {
    return new Promise(resolve => {
        let contentID = req.query.content;
        let type = req.query.type;
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");
        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }
    
        if (type == 'movie') {
            db.any('SELECT id, language FROM subtitle WHERE movie_id = $1', [contentID]).then(subtitles => {
                res.status(200).json({
                    subtitles: subtitles
                });
                resolve();
            })
        } else if (type == 'serie') {
            db.any('SELECT id, language FROM serie_episode_subtitle WHERE episode_id = $1', [contentID]).then(subtitles => {
                res.status(200).json({
                    subtitles: subtitles
                });
                resolve();
            });
        }

    });
}