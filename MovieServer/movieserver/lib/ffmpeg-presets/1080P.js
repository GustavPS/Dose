exports.load = function(ffmpeg) {
  ffmpeg
  //.withVideoCodec('h264_nvenc')
  .withVideoBitrate(8000)
  .withAudioCodec('libmp3lame')
  .outputOption([
    '-map 0',
    '-map -v',
    '-map 0:V',
    '-map 0:m:language:eng', // TODO: This should be an input parameter to be able to change language
    '-deadline realtime',
    '-lag-in-frames 0',
    '-static-thresh 0',
    '-frame-parallel 1',
    '-crf 4',
    '-movflags frag_keyframe+faststart',
    '-pix_fmt yuv420p',
    '-sn',
    '-c:v h264_nvenc'
    //'-max_muxing_queue_size 1024'
  ])
  .outputFormat('mp4')
};