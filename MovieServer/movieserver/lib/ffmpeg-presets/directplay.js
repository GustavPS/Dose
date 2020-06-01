exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('copy')
    .withAudioCodec('copy')
    .outputFormat('mp4')
    .outputOptions([
        '-map 0:v',
        '-map 0:m:language:eng',
        '-sn',
        "-movflags frag_keyframe+faststart"
    ])
};