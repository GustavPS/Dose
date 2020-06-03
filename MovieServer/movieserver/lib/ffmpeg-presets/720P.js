exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('h264_nvenc')
    .withVideoBitrate(4000)
    .withAudioCodec('libmp3lame')
    .outputOption([
      '-map 0',
      '-map -v',
      //'-map -a',
      '-map 0:V',
      '-map 0:m:language:eng?', // TODO: This should be an input parameter to be able to change language
      '-sn',
      '-deadline realtime',
      '-lag-in-frames 0',
      '-static-thresh 0',
      '-frame-parallel 1',
      '-crf 4',
      '-vf scale=-1:720',
      '-movflags frag_keyframe+faststart',
      '-pix_fmt yuv420p'
    ])
    .outputFormat('mp4')
  };