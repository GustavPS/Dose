const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

const GetUser = (req, res) => {
    return new Promise(resolve => {
        res = cors(res);
        const token = req.query.token;
        if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
            res.status(403).end();
            return;
        }

        db.any(`SELECT id, username, has_access FROM users`)
        .then(data => {
            res.status(200).json(data);
            resolve();
        });
    });
}

export default GetUser;