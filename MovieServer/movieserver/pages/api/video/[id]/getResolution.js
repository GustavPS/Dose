const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];

const SUPPORTED_VIDEO_CODECS = [
  'h264',
  'h265'
]
const SUPPORTED_AUDIO_CODECS = [
  'aac',
  'mp3',
  'vorbis',
  'opus'
]
var ffmpeg = require('fluent-ffmpeg');


export default async(req, res) => {
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
        console.log(` > User tried to get the available resolutions movie/episode with id ${req.query.id} which does not exist`);
        res.status(404).end();
        return;
      }

  
      ffmpeg.ffprobe(filename, function(err, metadata) {
        if (err) {
          console.log(err);
        }
        let highestResolution = metadata.streams[0].width;
        let availableResolutions = []
        availableResolutions.push("1080P");
        availableResolutions.push("720P");
        availableResolutions.push("480P");
        availableResolutions.push("360P");
        availableResolutions.push("240P");


        let directPlay = SUPPORTED_VIDEO_CODECS.includes(metadata.streams[0].codec_name) && SUPPORTED_AUDIO_CODECS.includes(metadata.streams[1].codec_name)
  
        res.status(200).json({
            resolutions: availableResolutions,
            directplay: directPlay
        });
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