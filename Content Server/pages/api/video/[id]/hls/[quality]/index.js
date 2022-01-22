const db = require('../../../../../../lib/db');
import Transcoding from '../../../../../../lib/hls/transcoding';
import Movie from '../../../../../../lib/media/Movie';
import fs from 'fs';
import Episode from '../../../../../../lib/media/Episode';
const validateUser = require('../../../../../../lib/validateUser');
const Logger = require('../../../../../../lib/logger');
const logger = new Logger();

const segmentDur = Transcoding.SEGMENT_DURATION; //  Controls the duration (in seconds) that the file will be chopped into.

export default async (req, res) => {
    const { id, quality, duration, group, audioStream, type, token } = req.query;

    if (!validateUser(token, process.env.SECRET, 10800)) {
        res.status(403).end();
        resolve();
        return;
    }

    res.set({
        "Content-Disposition": "attachment; filename=\"m3u8.m3u8\"",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });

    const isMovie = type === 'movie';
    let splits = Math.max(duration / segmentDur) - 1;

    // Estimate the m3u8 file
    let out = '#EXTM3U\n' +
        '#EXT-X-VERSION:3\n' +
        `#EXT-X-TARGETDURATION:${segmentDur}\n` +
        '#EXT-X-MEDIA-SEQUENCE:0\n' +
        '#EXT-X-PLAYLIST-TYPE:VOD\n';

    for (let i = 0; i < splits; i++) {
        //out += "#EXT-X-DISCONTINUITY\n"
        out += `#EXTINF:${segmentDur}, nodesc\n/api/video/${id}/hls/${quality}/segments/${i}.ts?segments=${splits}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`;
    }
    out += '#EXT-X-ENDLIST\n';
    res.send(out);
}