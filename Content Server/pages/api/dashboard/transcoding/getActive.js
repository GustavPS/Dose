const Logger = require('../../../../lib/logger');
const HlsManager = require('../../../../lib/hls/HlsManager');

const logger = new Logger();
const validateUser = require('../../../../lib/validateUser');

const GetActiveTranscoding = async (req, res) => {
    const token = req.query.token;
    if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
        res.status(403).end();
        return;
    }

    const hlsManager = new HlsManager();
    const transcodings = hlsManager.getActiveTranscodings();

    const response = [];
    for (let transcoding of transcodings) {
        const promises = [transcoding.content.getName(), transcoding.content.getBackdrop()];
        const [name, backdrop] = await Promise.all(promises);
        response.push({
            title: name,
            user: transcoding.user,
            backdrop: backdrop,
            quality: transcoding.quality,
            watchProgress: transcoding.watchProgress
        });
    }

    res.status(200).json(response);
}

export default GetActiveTranscoding;