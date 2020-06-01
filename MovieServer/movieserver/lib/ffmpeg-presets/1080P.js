exports.load = function(ffmpeg) {
  ffmpeg
  .withVideoCodec('h264_nvenc')
  .withVideoBitrate(8000)
  .withAudioCodec('libmp3lame')
  .outputOption([
    '-map 0:v',
    '-map 0:m:language:eng',
    '-deadline realtime',
    '-lag-in-frames 0',
    '-static-thresh 0',
    '-frame-parallel 1',
    '-crf 4',
    '-movflags frag_keyframe+faststart',
    '-pix_fmt yuv420p',
    '-sn'
  ])
  .outputFormat('mp4')
};