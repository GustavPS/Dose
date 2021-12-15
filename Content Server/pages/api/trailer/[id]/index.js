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

      let file;
      if (type === 'MOVIE') {
        file = await getMovieTrailerPath(id);
      } else {
        logger.DEBUG("Trailer: trailers for shows is unsupported");
        res.status(404).end();
      }
      if (file == false) {
        res.end(err);
        return;
      }

      fs.access(file, fs.F_OL, (err) => {
        if (err) {
          logger.ERROR(`Trailer: Couldn't access trailer ${err}`);
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

function getMovieTrailerPath(movieID) {
  return new Promise((resolve, reject) => {
      db.one(`SELECT movie.trailer AS subpath, library.path AS basepath FROM library 
              INNER JOIN movie
              ON movie.library = library.id AND movie.id = $1
            `, [movieID]).then((result) => {
              resolve(path.join(result.basepath, result.subpath));
      }).catch(error => {
        reject(false);
      });
  });
}