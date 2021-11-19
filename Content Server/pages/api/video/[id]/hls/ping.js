
import HlsManager from '../../../../../lib/hls/HlsManager';
const Logger = require('../../../../../lib/logger');
const logger = new Logger().getInstance();

export default async (req, res) => {
    const { id, group } = req.query;
    const hlsManager = new HlsManager();

    // Client has sent a ping to let us know it's still active
    hlsManager.setLastRequestedTime(group);

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      });
    res.status(200).send();
}