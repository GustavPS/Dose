const db = require('../../../../lib/db').default;

const userHasAccessToServer = (userId, serverId) => {
    return new Promise((resolve, reject) => {
        db.any('SELECT * FROM user_server WHERE user_id = $1 AND server_id = $2', [userId, serverId]).then(result => {
            resolve(result.length > 0);
        })
    });
}

const getServerIp = (serverId) => {
    return new Promise((resolve, reject) => {
        db.one('SELECT server_ip FROM server WHERE server_id = $1', [serverId]).then(result => {
            resolve(result.server_ip);
        }).catch(err => {
            reject(`Server with id ${serverId} not found`);
        });
    });
};

export default async function handle(req, res) {
    const { id, serverName, username } = req.body;

    // TODO: Error handling
    return new Promise(async (resolve) => {
        let serverIp;
        try {
            serverIp = await getServerIp(serverName);
        } catch (err) {
            res.status(403).json({
                success: false,
                error: err
            });
            return;
        }

        fetch(`${serverIp}/api/requests/expected?id=${id}`)
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
                    db.any(`SELECT * FROM users WHERE username = $1`, [username]).then(result => {
                        if (result.length === 0) {
                            res.status(406).json({
                                success: false,
                                error: "User doesn't exist",
                                code: 1
                            });
                            resolve();
                        } else {
                            userHasAccessToServer(result[0].id, serverName).then(hasAccess => {
                                if (hasAccess) {
                                    res.status(406).json({
                                        success: false,
                                        error: "User already has access to this server",
                                        code: 2
                                    });
                                    resolve();
                                } else {
                                    db.none(`INSERT INTO user_server (user_id, server_id) VALUES ($1, $2)`, [result[0].id, serverName]);
                                    res.status(200).json({
                                        success: true
                                    });
                                    resolve();
                                }
                            });
                        }
                    });
                }
            });
    });
}