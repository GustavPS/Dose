exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('copy')
    .withAudioCodec('copy')
    .outputFormat('mp4')
    .outputOptions([
        "-movflags frag_keyframe+faststart"
    ])
};