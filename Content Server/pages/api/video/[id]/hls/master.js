import Movie from "../../../../../lib/media/Movie";
import HlsManager from "../../../../../lib/hls/HlsManager";
import getBrowser from "../../../../../lib/browsers/util";
import { useUserAgent } from 'next-useragent'

const LANGUAGES_LIST = require('../../../../../lib/languages');

const db = require('../../../../../lib/db');

const ffmpeg = require('fluent-ffmpeg');

const getMetadata = async(file) => {
    return new Promise( resolve => {
        ffmpeg.ffprobe(file, function(err, metadata) {
            resolve(metadata);
        });
    });
};

const getPixels = (quality) => {
    switch(quality) {
        case '8k':
            return "7680x4320";
        case '4k':
            return "3840x2160"
        case '1080p':
            return "1920x1080";
        case '720p':
            return "1280x720";
        case '480p':
            return "854x480";
        case '360p':
            return "640x360";
        case '240p':
            return "320x240";
        default:
            throw new Error("Invalid quality");
    }
}

const getM3u8Streams = (resolution, fps, id, duration, group, audioStream, directplay) => {
    let m3u8 = "";
    let bw = 12559492;
    if (resolution["8k"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('8k')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/8K?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["4k"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('4k')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/4K?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["1440p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('1440p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/1440P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["1080p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('1080p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/1080P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["720p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('720p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/720P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["480p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('480p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/480P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["360p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('360p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/360P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw -= 10000;
    if (resolution["240p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('240p')},AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/240P?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    //bw-= 10000;
    if (directplay) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=${bw},AVERAGE-BANDWIDTH=${bw},VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=directplay,AUDIO="audio",FRAME-RATE=${fps},SUBTITLES="subs"\n`;
        m3u8 += `/api/video/${id}/hls/DIRECTPLAY?duration=${duration}&group=${group}&audioStream=${audioStream}\n`
    }
    return m3u8;
}

const getSubtitleStreams = (id, subtitles) => {
    let m3u8 = "";
    for (let subtitle of subtitles) {
        m3u8 += `#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",LANGUAGE="${subtitle.language}",NAME="${subtitle.language}",AUTOSELECT=NO,FORCED=NO,AUTOSELECT=NO,URI="/api/video/${id}/hls/subtitles/${subtitle.id}"\n`;
    }
    return m3u8;
}


export default async (req, res) => {
    const { id, audioStream } = req.query;
    const movie = new Movie(id);
    const userAgent = useUserAgent(req.headers['user-agent']);
    const browser   = getBrowser(userAgent);

    const path = await movie.getFilePath()
    const resolutions = await movie.getResolutions();
    const subtitles = await movie.getSubtitles();
    let directPlay = browser.videoCodecSupported(resolutions["codec"]);
    const hlsManager = new HlsManager();
    const met = await getMetadata(path);

    let duration = met.format.duration;
    let fps = met.streams[0].r_frame_rate;
    for (let i = 0; i < met.streams.length; i++) {
        if (met.streams[i].codec_type === 'video') {
            fps = met.streams[i].r_frame_rate.substring(0, met.streams[i].r_frame_rate.indexOf('/'));
        }
    }

    const groupHash = hlsManager.generateHash();
    res.set({
        "Content-Disposition": "attachment; filename=\"m3u8.m3u8\"",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });

    let m3u8 = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-INDEPENDENT-SEGMENTS
`;
    if (subtitles.length > 0) {
        m3u8 += getSubtitleStreams(id, subtitles);
    }

    m3u8 += getM3u8Streams(resolutions, fps, id, duration, groupHash, audioStream, directPlay);
    res.status(200).send(m3u8);
}