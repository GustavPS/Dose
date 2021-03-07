exports.load = function(ffmpeg) {
ffmpeg
    .withVideoCodec('libx264')
    .withVideoBitrate(4000)
    .withAudioCodec('libmp3lame')
    .inputOption([
      '-re'
    ])
   /* .outputOption([
      '-g 52',
      '-map 0',
      '-map -v',
      '-map 0:V',
      '-sn',
      '-deadline realtime',
      '-lag-in-frames 0',
      '-static-thresh 0',
      '-frame-parallel 1',
      '-crf 4',
      '-vf scale=-1:720',
      '-movflags frag_keyframe+empty_moov+faststart',
      '-pix_fmt yuv420p'
    ])*/
    .outputOption([
/*
'-movflags frag_keyframe+empty_moov+faststart',
'-pix_fmt yuv420p',
'-preset ultrafast',
 '-deadline realtime',
'-crf 30'
*/
      '-g 52',
      '-map 0',
      '-map -v',
      '-map 0:V',
      '-sn',
      '-deadline realtime',
      '-lag-in-frames 0',
      '-static-thresh 0',
      '-frame-parallel 1',
      '-crf 22',
      '-vf scale=trunc(oh*a/2)*2:720',
      '-movflags frag_keyframe+empty_moov+faststart',
      '-pix_fmt yuv420p',
      '-preset ultrafast'

    ])
    .outputFormat('mp4')
  };
