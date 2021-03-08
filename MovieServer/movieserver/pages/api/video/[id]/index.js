import { resolve } from 'path';
import { Stream } from 'stream';
const db = require('../../../../lib/db');
const validateUser = require('../../../../lib/validateUser');

var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const mime = require('mime');
let transcodings = [];

var AsyncLock = require('async-lock');
var lock = new AsyncLock();

const ALLOWED_QUALITIES = [
  '1080P',
  '720P',
  '480P',
  '360P',
  '240P',
  'directplay'
];

export default async (req, res) => {
    let type = req.query.type;
    let language = req.query.audio;
    let token = req.query.token;
    
    if (!validateUser(token)) {
        res.status(403).end();
        resolve();
        return;
    }

    if (!['movie', 'serie'].includes(type)) {
      res.status(404).end();
      return;
    }

    let filename = "";
    try {
      if (type === 'movie') {
        filename = await getMoviePath(req.query.id);
      } else if (type === 'serie') {
        filename = await getEpisodePath(req.query.id); 
      }
    } catch(error) {
      console.log(` > User tried to access movie/episode with id ${req.query.id} which does not exist`);
      res.status(404).end();
      return;
    }


    var stat = fs.statSync(filename);
    var start = 0;
    var end = 0;
    var range = req.headers.range;
    if (range != null) {
      start = parseInt(range.slice(range.indexOf('bytes=')+6,
      range.indexOf('-')));
      end = parseInt(range.slice(range.indexOf('-')+1,
      range.length));
    }

    if (isNaN(end) || end == 0) {
      end = stat.size-1;
      //end = start + 1000;
    }

    var duration = (end / 1024) * 8 / 1024;

    res.writeHead(200, { // NOTE: a partial http response
        'Accept-Ranges': 'bytes',
        'Connection':'keep-alive', // Maybe should be keep-alive? To prevent ERR_INCOMPLETE_CHUNKED_ENCODING 200 after video paus
        'Content-Range':'bytes '+start+'-'+end+'/*',
        'Transfer-Encoding':'chunked',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        "Content-Disposition":"inline",
        "Content-Transfer-Enconding":"binary",
        'Content-Type': 'video/mp4'
    });

    let offset = req.query.start ? req.query.start : 0;
    startFFMPEG(filename, offset, language, req, res);
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

function getEpisodePath(showID) {
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

function killOtherInstances(serverToken) {
  let count = 0;
  let remove = [];
  for (let t of transcodings) {
    if (t.token == serverToken) {
      remove.push(count);
      try {
        t.process.kill();
      } catch(e) {
        console.log("Tried to kill a transcoding but the process was already killed.");
      }
    }
    count++;
  }

  for (let i of remove) {
    transcodings.splice(i, 1);
  }
}

function startFFMPEG(filename, offset, language, req, res) {
  /*
  Direct play: https://stackoverflow.com/questions/40077681/ffmpeg-converting-from-mkv-to-mp4-without-re-encoding ?


  */

  let quality = req.query.quality;
  if (!ALLOWED_QUALITIES.includes(quality)) {
    console.log(`${quality} is not a valid quality selector`);
    res.status(404).end();
    return;
  }

  // Create the output optins array according to the language
  let audioSettings = []
  if (language !== null && language !== undefined && language !== 'unknown') {
    audioSettings.push('-map -a');
    //audioSettings.push(`-map 0:m:language:${language}?`);
    audioSettings.push(`-map 0:${language}?`);
  }
  //audioSettings.push('-metadata ')
  

  // crf = constant rate factor, lower is better
  // https://superuser.com/questions/677576/what-is-crf-used-for-in-ffmpeg
  var proc = ffmpeg(filename, { presets: '../../../../lib/ffmpeg-presets'})
        .preset(quality)
        // Might be faster with only 1 thread? TODO: Test it
        .inputOptions([
          `-ss ${offset}`,
          '-threads 8'
        ])
        .outputOptions(audioSettings)

        .on('start', function(commandLine) {
          console.log(commandLine)
        })
          // setup event handlers
        .on('end', function() {
          try {
            this.kill();
          } catch(e) {

          }
        })
        .on('progress', function(progress) {
          //console.log('Processing: ' + progress.percent + '% done');
        })
        .on('error', function(err, stdout, stderr) {
          //console.log(err);
          //console.log(stdout);
          //console.log(stderr);
          if (err.message != 'Output stream closed' && err.message != 'ffmpeg was killed with signal SIGKILL') {
            if (stdout != undefined) {
              console.log(stdout);
            }
            if (stderr != undefined) {
              console.log(stderr);
            }
            try {
              this.kill();
            } catch(e) {
              
            }
            console.log('an error happened: ' + err.message);
          }
        })
        .on('exit', function() {
          try {
            this.kill();
          } catch(e) {

          }
        })

          
        // TODO: Lås med accesstoken+videoid
        lock.acquire('key', function(done) {
          killOtherInstances(req.query.token);
          transcodings.push({
            process: proc,
            token: req.query.token
          });
          done();
        }, function() {
          // save to stream and start the transcoding
          proc.output(res,{ end:true }).run();

        });

}
