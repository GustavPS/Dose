
import HlsManager from '../../../../../lib/hls/HlsManager';

export default async (req, res) => {
    const { id, group } = req.query;
    const hlsManager = new HlsManager();

    // Client has sent a ping to let us know it's still active
    hlsManager.stopAllVideoTranscodings(group);

    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      });
    res.status(200).send();
}