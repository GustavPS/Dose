const db = require('../../../lib/db');
const cors = require('../../../lib/cors');
const jwt = require('jsonwebtoken');
const validateUser = require('../../../lib/validateUser');

export default (req, res) => {
    return new Promise(resolve => {
        res = cors(res);

        let token = req.query.token;
        if (!validateUser(token)) {
            res.status(403).end();
            resolve();
            return;
        }
        
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
  