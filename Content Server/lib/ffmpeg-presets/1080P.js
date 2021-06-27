const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(6000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("1080P"))
  .outputFormat('mp4')
};