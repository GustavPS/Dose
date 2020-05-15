import { Stream } from 'stream';
const db = require('../../../../lib/db');

var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const mime = require('mime');
let transcodings = [];

var AsyncLock = require('async-lock');
var lock = new AsyncLock();

export default async (req, res) => {
  getMoviePath(req.query.id).then(filename => {
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
          'Connection':'close',
          'Content-Range':'bytes '+start+'-'+end+'/*',
          'Transfer-Encoding':'chunked',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          "Content-Disposition":"inline",
          "Content-Transfer-Enconding":"binary"
      });
        let offset = req.query.start ? req.query.start : 0;
        startFFMPEG(filename, offset, req, res);
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

function killOtherInstances(serverToken) {
  let count = 0;
  let remove = [];
  for (let t of transcodings) {
    if (t.token == serverToken) {
      remove.push(count);
      try {
        t.process.kill();
        console.log("Killing a transcoding")
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

function startFFMPEG(filename, offset, req, res) {
  /*
  Direct play: https://stackoverflow.com/questions/40077681/ffmpeg-converting-from-mkv-to-mp4-without-re-encoding ?


  */

  // crf = constant rate factor, lower is better
  // https://superuser.com/questions/677576/what-is-crf-used-for-in-ffmpeg
  var proc = ffmpeg(filename, { presets: '../../../../lib/ffmpeg-presets'})
        .preset('directplay')
        // Might be faster with only 1 thread? TODO: Test it
        .inputOptions([
          `-ss ${offset}`,
          '-threads 3'
        ])

        .on('start', function(commandLine) {

        })
          // setup event handlers
        .on('end', function() {
          try {
            this.kill();
          } catch(e) {

          }
          console.log('file has been converted succesfully');
        })
        .on('progress', function(progress) {
          //console.log('Processing: ' + progress.percent + '% done');
        })
        .on('error', function(err, stdout, stderr) {
          try {
            this.kill();
          } catch(e) {
            
          }
          console.log('an error happened: ' + err.message);

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