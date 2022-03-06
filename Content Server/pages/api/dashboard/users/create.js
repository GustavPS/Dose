import MainServerRequestHandler from '../../../../lib/requests/MainServerRequestHandler';

const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const validateUser = require('../../../../lib/validateUser');
const Logger = require('../../../../lib/logger');
const logger = new Logger();

const addUserToMainServer = (mainServerUrl, serverName, username) => {
    return new Promise((resolve, reject) => {
        const requestHandler = new MainServerRequestHandler();
        requestHandler.addExpectedRequest().then(id => {
            fetch(`${mainServerUrl}/api/servers/users/add`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    serverName: serverName,
                    username: username
                })
            }).then(res => res.json()).then(result => {
                if (result.success) {
                    resolve();
                } else {
                    reject({
                        error: result.error,
                        code: result.code
                    });
                }
            }).catch(err => {
                reject({
                    code: -1,
                    error: err
                });
            });
        });
    });
}

const getGeneralInfo = () => {
    return new Promise((resolve, reject) => {
        db.one('SELECT * FROM general').then(result => {
            resolve(result);
        })
    });
}


export default (req, res) => {
    const { username, token } = req.body;
    if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
        res.status(403).json({
            success: false,
            error: 'Invalid token'
        });
        return;
    } else if (!username) {
        res.status(400).json({
            success: false,
            error: 'Missing username'
        });
        return;
    }

    return new Promise(async (resolve) => {
        const generalInfo = await getGeneralInfo();
        const mainServerUrl = generalInfo.main_server_ip;
        const serverName = generalInfo.server_name;

        addUserToMainServer(mainServerUrl, serverName, username).then(() => {
            db.any(`SELECT * FROM users WHERE username = $1`, [username]).then(data => {
                if (data.length > 0) {
                    logger.DEBUG(`User ${username} already exists`);
                    res.status(406).json({
                        success: false,
                        error: 'User already exists'
                    }); // 406 Not Acceptable
                    return;
                }
                db.none('INSERT INTO users (username, has_access) VALUES ($1, $2)', [username, true]).then(() => {
                    res.status(200).json({
                        success: true
                    });
                    logger.INFO(`Added user with username ${username}`);
                    resolve();
                }).catch(err => {
                    logger.ERROR(`Failed to add user with username ${username}. ${err}`);
                    res.status(500).json({
                        success: false,
                        error: err
                    });
                    resolve();
                });
            });
        }).catch(err => {
            res.status(406).json({
                success: false,
                error: err.error
            });
        });
    });
}
