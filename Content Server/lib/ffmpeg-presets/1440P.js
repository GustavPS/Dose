const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(13000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("1440P"))
  .outputFormat('mp4')
};