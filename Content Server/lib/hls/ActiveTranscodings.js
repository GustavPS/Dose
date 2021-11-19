var _transcodings = [];

exports.addTranscoding = function(transcoding) {
    _transcodings.push(transcoding);
};

exports.getTranscodings = function() {
    return _transcodings;
};

exports.removeTranscoding = function(index) {
    _transcodings.splice(index, 1);
};