const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');


export default (req, res) => {
  return new Promise(async (resolve, reject) => {

  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "*");

  let token = req.query.token;
  if (!validateUser(token)) {
      res.status(403).end();
      resolve();
      return;
  }

  let type = req.query.type;
  if (!['movie', 'serie'].includes(type)) {
    res.status(404).end();
    resolve();
    return;
  }

  // TODO: Error handling
  let filename = "";
  try {
    if (type === 'movie') {
      filename = await getMoviePath(req.query.id);
    } else if (type === 'serie') {
      filename = await getShowPath(req.query.id);
    }
  } catch(error) {
    console.log(` > User tried to get the duration of movie/episode with id ${req.query.id} which does not exist`);
    res.status(404).end();
    resolve();
    return;
  }

  ffmpeg.ffprobe(filename, function(err, metadata) {
    if (err) {
      console.log(err);
    }
      res.status(200).json({duration: metadata.format.duration});
      resolve();
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
            }).catch(error => {
              reject();
            });
  });
}
function getShowPath(showID) {
  return new Promise((resolve, reject) => {


    db.one(`SELECT DISTINCT serie_episode.path AS subpath, library.path AS basepath FROM serie_episode
            INNER JOIN serie
            ON serie.id = serie_episode.serie_id

            INNER JOIN library
            ON serie.library = library.id

            WHERE serie_episode.id = $1
    `, [showID]).then(result => {
      resolve(`${result.basepath}${result.subpath}`);
    }).catch(error => {
      reject();
    });
  });
}