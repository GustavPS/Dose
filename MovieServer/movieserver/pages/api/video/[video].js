import { Stream } from 'stream';

var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const mime = require('mime');

export default async (req, res) => {
    let filename = "C:\\Users\\Gustav\\code\\nextjs-blog\\MovieServer\\movieserver\\movies\\bms.mkv";


    let path = filename;
    console.log(path);
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4',
        'Content-Duration': '500'
      }
      res.writeHead(200, head);

      //'-movflags frag_keyframe+empty_moov'
      
      var proc = ffmpeg(filename)

      .withVideoBitrate(1024)
      .withVideoCodec('libx264')
      .withAspect('16:9')
      .withAudioBitrate('320k')
      .withAudioCodec('aac')
      .outputOption(
        [
          '-movflags frag_keyframe+empty_moov',
          '-threads 3'
        ])
      
      .withOutputFormat('mp4')
      .on('start', function(commandLine) {
        console.log('Spawned Ffmpeg with command: ' + commandLine);
      })
        // setup event handlers
      .on('end', function() {
        console.log('file has been converted succesfully');
      })
      .on('progress', function(progress) {
        //console.log(progress);
        //console.log('Processing: ' + progress.percent + '% done');
    })
      .on('error', function(err, stdout, stderr) {
        console.log(err);
        console.log("stdout:\n" + stdout);
        console.log("stderr:\n" + stderr); //this will contain more detailed debugging info
        console.log('an error happened: ' + err.message);
      })
        // save to stream
        .pipe(res, {end: true});
        
      //file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(filename).pipe(res)
    }



























    /*
    res.setHeader('Content-Type', 'video/flv');

    fs.stat(filename, function (err, stats) {
      var range = req.headers.range;
      if (!range) {
        console.log("Ingen range");
          return res.status(416).end();

      }
      //Chunk logic here
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;


      res.writeHead(206, {

          'Transfer-Encoding': 'chunked',

          "Content-Range": "bytes " + start + "-" + end + "/" + total,

          "Accept-Ranges": "bytes",

          "Content-Length": chunksize,

          "Content-Type": 'video/flv'

      });

    // make sure you set the correct path to your video file storage
    var proc = ffmpeg(filename)
    .preset('flashvideo')
      // setup event handlers
      .on('end', function() {
        console.log('file has been converted succesfully');
      })
      .on('progress', function(progress) {
        console.log('Processing: ' + progress.percent + '% done');
    })
      .on('error', function(err) {
        console.log('an error happened: ' + err.message);
      })
      // save to stream
      .pipe(res, {end:true});
  });
  */
}