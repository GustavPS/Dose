const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const ORDERBY = [
  'id',
  'added_date',
  'release_date',
  'popularity'
];
var ffmpeg = require('fluent-ffmpeg');


export default (req, res) => {
    ffmpeg.ffprobe('C:\\Users\\Gustav\\code\\nextjs-blog\\MovieServer\\movieserver\\movies\\bms.mkv', function(err, metadata) {
        res.status(200).json({duration: metadata.format.duration});
    });
}