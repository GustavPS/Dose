exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('h264_nvenc')
    .withVideoBitrate(500)
    .withAudioCodec('libmp3lame')
    .inputOption([
      '-re'
    ])
    .outputOption([
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
      '-vf scale=-1:240',
      '-movflags frag_keyframe+empty_moov+faststart',
      '-pix_fmt yuv420p'
    ])
    .outputFormat('mp4')
  };