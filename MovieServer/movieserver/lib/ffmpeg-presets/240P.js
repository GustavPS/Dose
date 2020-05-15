exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('libvpx')
    .withVideoBitrate(50000)
    .withAudioCodec('libvorbis')
    .outputOption([
      '-deadline realtime',
      '-lag-in-frames 0',
      '-static-thresh 0',
      '-frame-parallel 1',
      '-crf 4',
      '-vf scale=-1:240'
    ])
    .outputFormat('webm')
  };