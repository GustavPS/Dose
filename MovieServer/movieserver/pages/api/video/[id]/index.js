import { Stream } from 'stream';

var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const mime = require('mime');

export default async (req, res) => {
    let filename = "C:\\Users\\Gustav\\code\\nextjs-blog\\MovieServer\\movieserver\\movies\\bms.mkv";

    var stat = fs.statSync(filename);
      var start = 0;
      var end = 0;
      var range = req.headers.range;
      console.log(range);
      if (range != null) {
        start = parseInt(range.slice(range.indexOf('bytes=')+6,
        range.indexOf('-')));
        end = parseInt(range.slice(range.indexOf('-')+1,
        range.length));
      }
      if (isNaN(end) || end == 0) {
        console.log("FÖRST REQUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST")
        end = stat.size-1;
        //end = start + 1000;

      }
      var duration = (end / 1024) * 8 / 1024;

      res.writeHead(200, { // NOTE: a partial http response
          'Accept-Ranges': 'bytes',
          'Connection':'close',
          'Content-Type':'video/webm',
          'Content-Range':'bytes '+start+'-'+end+'/*',
          'Transfer-Encoding':'chunked',
          'Access-Control-Allow-Origi': '*',
          "Content-Disposition":"inline",
          "Content-Transfer-Enconding":"binary"
      });
        let cmd  = "";
        let offset = req.query.start ? req.query.start : 0;
              
        var proc = ffmpeg(filename)
        .inputOptions([
          `-ss ${offset}`
        ])
        .setStartTime(offset)
        .withVideoCodec('libvpx')
        .withVideoBitrate(1024)
        .withAudioCodec('libvorbis')
        .outputFormat('webm')

        .on('start', function(commandLine) {
          console.log('Spawned Ffmpeg with command: ' + commandLine);
          cmd = commandLine;
        })
          // setup event handlers
        .on('end', function() {
          console.log('file has been converted succesfully');
        })
        .on('progress', function(progress) {
          //console.log(progress);
          console.log(progress);
          console.log('Processing: ' + progress.percent + '% done');
        })
        .on('error', function(err, stdout, stderr) {
          console.log(`COMMAND: ${cmd}`);
          console.log(err);
          console.log("stdout:\n" + stdout);
          console.log("stderr:\n" + stderr); //this will contain more detailed debugging info
          console.log('an error happened: ' + err.message);

        })
          // save to stream
          .output(res,{ end:true })
          .run()

}