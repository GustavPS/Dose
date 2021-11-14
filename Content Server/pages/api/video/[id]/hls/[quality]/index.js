const db = require('../../../../../../lib/db');
import Transcoding from '../../../../../../lib/hls/transcoding';

const pathToMovie = '/home/gustav/testMovies/Top Gun/Top Gun.mp4';  // The input file to stream as HLS.
const segmentDur = Transcoding.SEGMENT_DURATION; //  Controls the duration (in seconds) that the file will be chopped into.

export default async (req, res) => {
  const { id, quality, duration, group, audioStream } = req.query;

  let out = '#EXTM3U\n' +
      '#EXT-X-VERSION:3\n' +
      `#EXT-X-TARGETDURATION:${segmentDur}\n` +
      '#EXT-X-MEDIA-SEQUENCE:0\n' +
      '#EXT-X-PLAYLIST-TYPE:VOD\n';

  let splits = Math.max(duration / segmentDur) - 1;
  for(let i=0; i< splits; i++){
      //out += "#EXT-X-DISCONTINUITY\n"
      out += `#EXTINF:${segmentDur}, nodesc\n/api/video/${id}/hls/${quality}/segments/${i}.ts?segments=${splits}&group=${group}&audioStream=${audioStream}\n`;
  }
  out+='#EXT-X-ENDLIST\n';

  res.set({
    "Content-Disposition":"attachment; filename=\"m3u8.m3u8\"",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  });
  res.send(out);
}