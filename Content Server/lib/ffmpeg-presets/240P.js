const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(500)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("240P"))
  .outputFormat('mp4')
};
