exports.load = function(ffmpeg) {
    ffmpeg
    .withVideoCodec('copy')
    .withAudioCodec('copy')
    .outputFormat('mp4')
    .outputOptions([
        '-map 0',
        '-map -v',
        //'-map -a',
        '-map 0:V',
        '-map 0:m:language:eng?', // TODO: This should be an input parameter to be able to change language
        '-sn',
        "-movflags frag_keyframe+faststart"
    ])
};