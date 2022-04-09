import Logger from '../../../../lib/logger';
import MainServerRequestHandler from '../../../../lib/requests/MainServerRequestHandler';
const logger = new Logger();

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

const getGeneralInfo = () => {
    return new Promise((resolve, reject) => {
        db.one('SELECT * FROM general').then(result => {
            resolve(result);
        })
    });
}

const removeUserFromMainServer = (mainServerUrl, serverName, username) => {
    return new Promise((resolve, reject) => {
        const requestHandler = new MainServerRequestHandler();
        requestHandler.addExpectedRequest().then(id => {
            fetch(`${mainServerUrl}/api/servers/users/delete`, {
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
const DeleteUser = async (req, res) => {
    res = cors(res);
    const { token, id, username } = req.body;

    if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
        res.status(403).end();
        return;
    }

    const generalInfo = await getGeneralInfo();
    const mainServerUrl = generalInfo.main_server_ip;
    const serverName = generalInfo.server_name;
    removeUserFromMainServer(mainServerUrl, serverName, username).then(() => {
        db.none(`DELETE FROM users WHERE id = $1`, [id]);
        logger.INFO(`Deleted user with id ${id}`);
        res.status(200).json();
    }).catch(err => {
        res.status(406).json({
            success: false,
            error: err.error
        });
    });
}

export default DeleteUser;