const db = require('../../../lib/db').default;
const fetch = require('node-fetch');

export default async function handle(req, res) {
    const { id, ip, name } = req.body;

    // TODO: Error handling
    return new Promise(resolve => {
        fetch(`${ip}/api/requests/expected?id=${id}`)
            .then(res => res.json())
            .then(result => result.expected)
            .then(expected => {
                if (!expected) {
                    res.status(403).json({
                        success: false,
                        error: "Server didn't expect the request",
                        code: 2
                    });
                    resolve();
                } else {
                    db.any(`SELECT * FROM server WHERE server_ip = $1`, [ip, name]).then(result => {
                        if (result.length > 0) {
                            res.status(406).json({
                                success: false,
                                error: 'Server on this IP already exists',
                                code: 1
                            });
                            resolve();
                        } else {
                            db.none(`INSERT INTO server (server_id, server_ip, server_name) VALUES ($1, $2, $3)`, [name, ip, name]);
                            res.status(200).json({
                                success: true
                            });
                        }
                        resolve();
                    });
                }
            });
    });
}