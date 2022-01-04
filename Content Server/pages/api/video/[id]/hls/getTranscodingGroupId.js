
import HlsManager from '../../../../../lib/hls/HlsManager';
const validateUser = require('../../../../../lib/validateUser');

export default async (req, res) => {
    const { id, token } = req.query;
    const hlsManager = new HlsManager();
    let decoded = validateUser(token);
    if (!decoded) {
        res.status(403).end();
        resolve();
        return;
    }
    const transcodings = hlsManager.getActiveTranscodings();
    let group = "";
    let found = false;

    for (const transcoding of transcodings) {
        if (transcoding.user.username === decoded.username && transcoding.user.id === decoded.user_id) {
            if (transcoding.content.id === id) {
                group = transcoding.group;
                found = true;
                break;
            }
        }
    }

    const result = {
        found: found,
        group: group
    }

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      });
    res.status(200).json(result);
}