const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');


export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "*");

  // TODO: Error handling
  getMoviePath(req.query.id).then(filename => {
    ffmpeg.ffprobe(filename, function(err, metadata) {
      if (err) {
        console.log(err);
      }
        res.status(200).json({duration: metadata.format.duration});
    });
  });
  

}


function getMoviePath(movieID) {
  return new Promise((resolve, reject) => {
      db.one(`SELECT movie.path AS subpath, library.path AS basepath FROM library 
              INNER JOIN movie
              ON movie.library = library.id AND movie.id = $1
            `, [movieID]).then((result) => {
              resolve(`${result.basepath}${result.subpath}`)
            });
  });
}