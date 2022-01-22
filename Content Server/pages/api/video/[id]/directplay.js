import Episode from '../../../../lib/media/Episode';
import Movie from '../../../../lib/media/Movie';

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const fs = require('fs');
const path = require('path');
const Logger = require('../../../../lib/logger');
const logger = new Logger();

export default (req, res) => {
    return new Promise(async (resolve, reject) => {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Headers', "*");

        let token = req.query.token;
        let id = req.query.id;
        let type = req.query.type;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }

        const content = type == "movie" ? new Movie(id) : new Episode(id);
        const file = await content.getFilePath();

        fs.access(file, fs.F_OL, (err) => {
            if (err) {
                logger.ERROR(`Directplay: Couldn't access video: ${err}`);
                res.status(404).end();
                return;
            }
            fs.stat(file, function (err, stats) {
                var range = req.headers.range;
                if (!range) {
                    range = "bytes=0-";
                }
                var positions = range.replace(/bytes=/, "").split("-");
                var start = parseInt(positions[0], 10);
                var total = stats.size;
                var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
                var chunksize = end - start + 1;

                res.writeHead(206, {
                    "Content-Range": "bytes " + start + "-" + end + "/" + total,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunksize,
                    "Content-Type": "video/mp4",
                });

                var stream = fs
                    .createReadStream(file, { start: start, end: end })
                    .on("open", function () {
                        stream.pipe(res);
                    })
                    .on("error", function (err) {
                        res.end(err);
                    });
            });
        });

    });
}