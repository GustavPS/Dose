import MainServerRequestHandler from '../../../../lib/requests/MainServerRequestHandler';

const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const Logger = require('../../../../lib/logger');
const logger = new Logger();
const Config = require('../../../../lib/config');
const CommonEvent = require('../../../../lib/events/CommonEvent');

const reportToMainServer = (mainServerUrl, contentServerIp, contentServerName) => {
    return new Promise((resolve, reject) => {
        const requestHandler = new MainServerRequestHandler();
        requestHandler.addExpectedRequest().then(id => {
            fetch(`${mainServerUrl}/api/servers/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    ip: contentServerIp,
                    name: contentServerName
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
            })
                .catch(err => {
                    reject({
                        code: -1,
                        error: err
                    })
                })
        });
    });
}

const addAdminAccount = (username, password) => {
    return new Promise((resolve, reject) => {
        const salt = hash.getSalt(20);
        const hashed = hash.getHash(password, salt);
        db.none('INSERT INTO admin (username, password, salt) VALUES ($1, $2, $3)', [username, hashed, salt]).then(() => {
            resolve();
        }).catch(err => {
            // Error inserting to database
            logger.ERROR(`Error inserting to the database: ${err}`)
            reject(err);
        });
    });
}

const saveGeneralInfo = (serverName, mainServerIp) => {
    return new Promise(resolve => {
        db.none('INSERT INTO general (server_name, main_server_ip) VALUES ($1, $2)', [serverName, mainServerIp]).then(() => {
            resolve();
        });
    });
}

const saveToConfigFile = (config, mainServerUrl) => {
    return new Promise((resolve, reject) => {
        config.getConfig().then(info => {
            info.setup.admin = true;
            info.setup.done = true;
            info.mainServer = mainServerUrl;
            config.saveConfig(info).then(() => {
                logger.INFO(`Successfully saved admin info to config file`);
                resolve();
            }).catch(err => {
                logger.ERROR(`Failed to create admin account ${username} to config: ${err}`);
                reject("Couldn't write to config file");
            });
        });
    });
}

export default async (req, res) => {
    const { username, password, mainServerUrl, contentServerIp, contentServerName } = req.body;
    const config = new Config();
    const setupDone = await config.isSetupDone();

    if (setupDone) {
        res.status(400).json({
            success: false,
            error: 'Setup already done'
        });
        return;
    } else if (!username || !password) {
        res.status(400).json({
            success: false,
            error: 'Missing username or password'
        });
        return;
    } else if (username.length < 3 || username.length > 20) {
        res.status(400).json({
            success: false,
            error: 'Username must be between 3 and 20 characters'
        });
        return;
    } else if (password.length < 6 || password.length > 20) {
        res.status(400).json({
            success: false,
            error: 'Password must be between 6 and 20 characters'
        });
        return;
    }

    return new Promise(resolve => {
        fetch(`${mainServerUrl}/api/ping`).then(result => {
            reportToMainServer(mainServerUrl, contentServerIp, contentServerName).then(() => {
                addAdminAccount(username, password).then(() => {
                    saveToConfigFile(config, mainServerUrl).then(() => {
                        saveGeneralInfo(contentServerName, mainServerUrl).then(() => {
                            CommonEvent.emit('setup.done');
                            res.status(200).json({
                                success: true
                            });
                            resolve();
                        });
                    }).catch(err => {
                        // Error writing to config file
                        res.status(500).send({ success: false, error: "Couldn't write to config file" });
                        resolve();
                    });
                }).catch(err => {
                    // Couldn't add admin account
                    res.status(500).json({
                        success: false,
                        error: err
                    });
                    resolve();
                });
            }).catch(err => {
                // Couldn't add the content server to the main server
                if (err.code == 1) {
                    logger.WARNING(`Server ${contentServerIp} is already added on the main server, continuing anyway`);
                    addAdminAccount(username, password).then(() => {
                        saveToConfigFile(config, mainServerUrl).then(() => {
                            saveGeneralInfo(contentServerName, mainServerUrl).then(() => {
                                CommonEvent.emit('setup.done');
                                res.status(200).json({
                                    success: true
                                });
                                resolve();
                            });
                        }).catch(err => {
                            // Error writing to config file
                            res.status(500).send({ success: false, error: "Couldn't write to config file" });
                            resolve();
                        });
                    }).catch(err => {
                        // Couldn't add admin account
                        res.status(500).json({
                            success: false,
                            error: err
                        });
                        resolve();
                    });
                } else {
                    logger.WARNING(`Tried to add server to the main server, but failed. Error: ${err.error}`);
                    res.status(200).json({ success: false, error: err.error });
                    resolve();
                }
            });
        }).catch(err => {
            // Couldn't ping the main server
            res.status(200).json({ success: false, error: `Couldn't connect to main server` });
            resolve();
        });
    });
}
