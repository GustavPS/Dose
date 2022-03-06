const db = require('../../../../lib/db').default;
const fetch = require('node-fetch');

const getServerIp = (serverId) => {
    return new Promise((resolve, reject) => {
        db.one('SELECT server_ip FROM server WHERE server_id = $1', [serverId]).then(result => {
            resolve(result.server_ip);
        }).catch(err => {
            reject(`Server with id ${serverId} not found`);
        });
    });
};

const getUserId = (username) => {
    return new Promise((resolve, reject) => {
        db.one('SELECT id FROM users WHERE username = $1', [username]).then(result => {
            resolve(result.id);
        }).catch(err => {
            reject(`User with username ${username} not found`);
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
            resolve();
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
                    getUserId(username).then(userId => {
                        db.none(`DELETE FROM user_server WHERE user_id = $1`, [userId]);
                        res.status(200).json({
                            success: true
                        });
                        resolve();
                    }).catch(err => {
                        res.status(200).json({
                            success: false
                        });
                        resolve();
                    });
                }
            });
    });
}