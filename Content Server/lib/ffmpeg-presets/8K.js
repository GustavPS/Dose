const PresetUtil = require('./util');

exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(45000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("8K"))
  .outputFormat('mp4')
};
