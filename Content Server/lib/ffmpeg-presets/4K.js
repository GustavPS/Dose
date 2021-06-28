const PresetUtil = require('./util');


exports.load = function(ffmpeg) {
  const util = new PresetUtil();
  ffmpeg
  .withVideoCodec(util.getVideoCodec())
  .withVideoBitrate(26000)
  .inputOption([
    '-re'
  ])
  .outputOption(util.getTranscodingParameters("4K"))
  .outputFormat('mp4')
};
