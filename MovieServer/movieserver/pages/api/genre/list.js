const db = require('../../../lib/db');
const cors = require('../../../lib/cors');

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);
        db.any(`
        SELECT name FROM category;
        `).then(result => {
        let response = {
            genres: result
        }
        res.status(200).json(response);
        resolve();
        });
    });
}
  