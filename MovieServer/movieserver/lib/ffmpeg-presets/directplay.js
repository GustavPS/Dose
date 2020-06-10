exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('copy')
    .withAudioCodec('copy')
    .outputFormat('mp4')
    .outputOptions([
        '-map 0',
        '-map -v',
        '-map 0:V',
        '-sn',
        "-movflags frag_keyframe+faststart"
    ])
};