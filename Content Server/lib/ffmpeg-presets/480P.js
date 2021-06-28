const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(1000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("480P"))
  .outputFormat('mp4')
};
  