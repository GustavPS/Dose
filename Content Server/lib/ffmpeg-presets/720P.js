const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(4000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("720P"))
  .outputFormat('mp4')
};