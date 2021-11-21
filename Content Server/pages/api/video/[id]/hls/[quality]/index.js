const db = require('../../../../../../lib/db');
import Transcoding from '../../../../../../lib/hls/transcoding';
import Movie from '../../../../../../lib/media/Movie';
import fs from 'fs';
import Episode from '../../../../../../lib/media/Episode';
const Logger = require('../../../../../../lib/logger');
const logger = new Logger().getInstance();

const segmentDur = Transcoding.SEGMENT_DURATION; //  Controls the duration (in seconds) that the file will be chopped into.

export default async (req, res) => {
    return new Promise(async (resolve) => {
        const { id, quality, duration, group, audioStream, type } = req.query;

        res.set({
            "Content-Disposition": "attachment; filename=\"m3u8.m3u8\"",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        });
    
        const isDirectplay = quality === 'DIRECTPLAY';
        const isMovie = type === 'movie';
        let splits = Math.max(duration / segmentDur) - 1;
    
        if (isDirectplay) {
            // If we're using directplay, we have already created the HLS file
            const content = isMovie ? new Movie(id) : new Episode(id);
            const isDirectplayReady = await content.isDirectplayReady();
            if (isDirectplayReady) {
                const m3u8Path = await content.getM3u8Path();
    
                fs.readFile(m3u8Path, 'utf8', (err, data) => {
                    if (err) {
                        logger.ERROR(err);
                        return;
                    }
                    const reg = /result(\d+).ts/g;
                    const replace = `/api/video/${id}/hls/${quality}/segments/$1.ts?segments=${splits}&group=${group}&audioStream=${audioStream}&type=${type}`
                    const result = data.replace(reg, replace);
                    res.send(result);
                    resolve();
                });
            } else {
                logger.INFO(`User requested ${type} ${id} for directplay, but it's not ready for directplay yet.`);
                res.status(400).json({
                    error: `The ${type} is not ready for directplay.`
                });
                resolve();
            }
        } else {
            // If the quality is not directplay, we need to estimate the m3u8 file
            let out = '#EXTM3U\n' +
                '#EXT-X-VERSION:3\n' +
                `#EXT-X-TARGETDURATION:${segmentDur}\n` +
                '#EXT-X-MEDIA-SEQUENCE:0\n' +
                '#EXT-X-PLAYLIST-TYPE:VOD\n';
    
            for (let i = 0; i < splits; i++) {
                //out += "#EXT-X-DISCONTINUITY\n"
                out += `#EXTINF:${segmentDur}, nodesc\n/api/video/${id}/hls/${quality}/segments/${i}.ts?segments=${splits}&group=${group}&audioStream=${audioStream}&type=${type}\n`;
            }
            out += '#EXT-X-ENDLIST\n';
            res.send(out);
            resolve();
        }
    });
}