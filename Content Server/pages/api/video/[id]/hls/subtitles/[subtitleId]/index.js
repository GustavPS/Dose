

export default async (req, res) => {
    const { id, subtitleId } = req.query;
    const movieLength = 14400;
    let m3u8 = `#EXTM3U
#EXT-X-TARGETDURATION:${movieLength}
#EXT-X-VERSION:3
#EXT-X-MEDIA-SEQUENCE:0
#EXT-X-PLAYLIST-TYPE:VOD
#EXTINF:${movieLength}
/api/video/${id}/hls/subtitles/${subtitleId}/0
#EXT-X-ENDLIST`;

    res.set({
        "Content-Disposition": "attachment; filename=\"m3u8.m3u8\"",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
    });
    res.status(200).send(m3u8);
};