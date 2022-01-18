import Movie from "../../../../../lib/media/Movie";
import HlsManager from "../../../../../lib/hls/HlsManager";
import getBrowser from "../../../../../lib/browsers/util";
import { useUserAgent } from 'next-useragent'
import Episode from "../../../../../lib/media/Episode";

const db = require('../../../../../lib/db');
const validateUser = require('../../../../../lib/validateUser');
const Logger = require('../../../../../lib/logger');
const logger = new Logger();
const LANGUAGES_LIST = require('../../../../../lib/languages');
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
        case '1440p':
            return "2560x1440"
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

/**
 * Return the m3u8 playlist for the given video, if the client is iOS only give one quality
 * since otherwise the iOS player will play the lowest quality
 * 
 * @param {Object} resolution - Resolution object (The supported resolutions)) 
 * @param {*} fps - The fps of the video
 * @param {*} id - The id of the video
 * @param {*} duration - The duration of the video
 * @param {*} group - The transcoding group
 * @param {*} audioStream - The audio stream to use
 * @param {*} directplay - If the video supports directplay
 * @param {*} type - The type of the video (movie or episode)
 * @param {*} isIos - If the user is using an iOS device
 * @returns 
 */
const getM3u8Streams = (resolution, fps, id, duration, group, audioStream, directplay, type, isIos, hasSubtitles, token) => {
    let m3u8 = "";
    let bw = 4000;
    const subtitleString = hasSubtitles ? ',SUBTITLES="subs"' : '';
    if (directplay) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=4500,AVERAGE-BANDWIDTH=4500,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",FRAME-RATE=${fps},NAME="Directplay"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/DIRECTPLAY?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    if (resolution["8k"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=6000,AVERAGE-BANDWIDTH=6000,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('8k')},FRAME-RATE=${fps},NAME="8K"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/8K?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
    }
    bw -= 500;
    if (resolution["4k"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=5500,AVERAGE-BANDWIDTH=5500,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('4k')},FRAME-RATE=${fps},NAME="4K"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/4K?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
    }
    bw -= 500;
    if (resolution["1440p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=5000,AVERAGE-BANDWIDTH=5000,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('1440p')},FRAME-RATE=${fps},NAME="1440P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/1440P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
    }
    bw -= 500;
    if (resolution["1080p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=1000,AVERAGE-BANDWIDTH=1000,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('1080p')},FRAME-RATE=${fps},NAME="1080P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/1080P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    bw -= 500;
    if (resolution["720p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=800,AVERAGE-BANDWIDTH=800,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('720p')},FRAME-RATE=${fps},NAME="720P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/720P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    bw -= 500;
    if (resolution["480p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=600,AVERAGE-BANDWIDTH=600,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('480p')},FRAME-RATE=${fps},NAME="480P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/480P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    bw -= 500;
    if (resolution["360p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=500,AVERAGE-BANDWIDTH=500,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('360p')},FRAME-RATE=${fps},NAME="360P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/360P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    bw -= 500;
    if (resolution["240p"]) {
        m3u8 += `#EXT-X-STREAM-INF:BANDWIDTH=300,AVERAGE-BANDWIDTH=300,VIDEO-RANGE=SDR,CODECS="avc1.640028,mp4a.40.2",RESOLUTION=${getPixels('240p')},FRAME-RATE=${fps},NAME="240P"${subtitleString}\n`;
        m3u8 += `/api/video/${id}/hls/240P?duration=${duration}&group=${group}&audioStream=${audioStream}&type=${type}&token=${token}\n`
        if (isIos) {
            return m3u8;
        }
    }
    return m3u8;
}

const getSubtitleStreams = (id, subtitles, type, token) => {
    let m3u8 = "";
    let autoselect = "NO";
    for (let subtitle of subtitles) {
        m3u8 += `#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="subs",LANGUAGE="${subtitle.language}",NAME="${subtitle.language}",FORCED=NO,AUTOSELECT=${autoselect},DEFAULT=${autoselect},URI="/api/video/${id}/hls/subtitles/${subtitle.id}?type=${type}&token=${token}"\n`;
        autoselect = "NO";
    }
    return m3u8;
}

export default async (req, res) => {
    const { id, audioStream, type, token } = req.query;
    
    if (!validateUser(token)) {
        res.status(403).end();
        return;
    }


    const content = type == "movie" ? new Movie(id) : new Episode(id);
    //const movie = new Movie(id);
    const userAgent = useUserAgent(req.headers['user-agent']);
    const isChromecast = req.headers['user-agent'].indexOf('CrKey') !== -1; // Currently Chromecast is not supported for directplay streaming
    const isIos = userAgent.isIphone || userAgent.isMac;
    const browser   = getBrowser(userAgent);

    const path = await content.getFilePath()
    const resolutions = await content.getResolutions();
    const subtitles = await content.getSubtitles();
    const isDirectplayReady = await content.isDirectplayReady();
    let directPlay = browser.videoCodecSupported(resolutions["codec"]) && !isChromecast && isDirectplayReady;
    const hlsManager = new HlsManager();
    const met = await getMetadata(path);

    if (!isDirectplayReady) {
        logger.INFO(`Directplay is not ready for ${id}, forcing transcodings`);
    }

    let duration = met.format.duration;
    let fps = met.streams[0].r_frame_rate;
    for (let i = 0; i < met.streams.length; i++) {
        if (met.streams[i].codec_type === 'video') {
            const firstParam = met.streams[i].r_frame_rate.substring(0, met.streams[i].r_frame_rate.indexOf('/'));
            const secondParam = met.streams[i].r_frame_rate.substring(met.streams[i].r_frame_rate.indexOf('/')+1, met.streams[i].r_frame_rate.length);
            fps = parseInt(firstParam) / parseInt(secondParam);
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
        m3u8 += getSubtitleStreams(id, subtitles, type, token);
    }

    m3u8 += getM3u8Streams(resolutions, fps, id, duration, groupHash, audioStream, directPlay, type, isIos, subtitles.length > 0, token);
    res.status(200).send(m3u8);
}