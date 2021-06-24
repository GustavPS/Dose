const cors = require('../../lib/cors');


export default async (req, res) => {
    res = cors(res);
    res.status(200).end();
}
  