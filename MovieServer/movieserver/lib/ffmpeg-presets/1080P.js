exports.load = function(ffmpeg) {
  ffmpeg
  .withVideoCodec('libx264')
  .withVideoBitrate(6000)
  .withAudioCodec('aac')
  .inputOption([
    '-re'
  ])
  .outputOption([
    '-g 52',
    '-map 0',
    '-map -v',
    '-map 0:V',
    '-deadline realtime',
    '-lag-in-frames 0',
    '-static-thresh 0',
    '-frame-parallel 1',
    '-crf 4',
    '-movflags frag_keyframe+empty_moov+faststart',
    '-pix_fmt yuv420p',
    '-sn',
    '-max_muxing_queue_size 9999'
  ])
  .outputFormat('mp4')
};
