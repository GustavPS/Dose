const db = require('../../lib/db');
const cors = require('../../lib/cors');

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);

        let token = req.query.token;
        if (token != "THISSTRINGISHARDTOBREAK") {
            res.status(403).end();
            resolve();
            return;
        }

        let response = {
            movieCount: 0,
            showCount: 0
        }
        db.one(`SELECT COUNT(*) FROM movie`).then(movies => {
            response.movieCount = movies.count;
            //console.log("Movie ÄR LIKA MED " + JSON.stringify(movies.count))
            db.one(`SELECT COUNT(*) FROM serie`).then(series => {
                response.showCount = series.count;
                //console.log("Series ÄR LIKA MED " + JSON.stringify(series.count))
                res.status(200).json(response);
                resolve();
            });
        });
    });
}
  