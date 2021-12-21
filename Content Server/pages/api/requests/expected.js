/**
 * Endpoint: /api/requests/expected
 * Type:     GET
 * Parameters:
 *  id - {String}
 * 
 * Brief:
 *  Check if a request with a specified ID is expected by the server
 */

import MainServerRequestHandler from '../../../lib/requests/MainServerRequestHandler';
const cors = require('../../../lib/cors');

export default async (req, res) => {
    const { id } = req.query;
    res = cors(res);

    return new Promise(resolve => {
        const requestHandler = new MainServerRequestHandler();
        requestHandler.requestIdExist(id).then(exist => {
            if (exist) {
                requestHandler.removeExpectedRequest(id);
            }

            res.status(200).json({
                expected: exist
            });
            resolve()
        });
    });
}
