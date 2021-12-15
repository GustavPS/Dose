const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const validateUser = require('../../../lib/validateUser');

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);

        const token = req.query.token;
        if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
            res.status(403).end();
            return;
        }

        let response = {
            movieCount: 0,
            showCount: 0
        }
        db.one(`SELECT COUNT(*) FROM movie`).then(movies => {
            response.movieCount = movies.count;
            db.one(`SELECT COUNT(*) FROM serie`).then(series => {
                db.one(`SELECT COUNT(*) FROM serie_episode`).then(episodes => {
                    response.showCount = series.count;
                    response.episodeCount = episodes.count;
                    res.status(200).json(response);
                    resolve();
                });
            });
        });
    });
}