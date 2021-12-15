const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const Logger = require('../../../../lib/logger');
const Config = require('../../../../lib/config');
const CommonEvent = require('../../../../lib/events/CommonEvent');

const logger = new Logger();

export default (req, res) => {
    const { username, password, mainServerUrl } = req.body;
    return new Promise(resolve => {
        console.log(mainServerUrl);
        fetch(`${mainServerUrl}/api/ping`).then(result => {
            const salt = hash.getSalt(20);
            const hashed = hash.getHash(password, salt);
            db.none('INSERT INTO admin (username, password, salt) VALUES ($1, $2, $3)', [username, hashed, salt])
                .then(() => {
                    const config = new Config();
                    config.getConfig()
                        .then(info => {
                            info.setup.admin = true;
                            info.setup.done = true;
                            info.mainServer = mainServerUrl;
                            config.saveConfig(info)
                                .then(() => {
                                    res.status(200).json({
                                        success: true
                                    });
                                    logger.INFO(`Successfully saved admin info to config file`);
                                    CommonEvent.emit('setup.done');
                                    resolve();
                                })
                                .catch(err => {
                                    logger.ERROR(`Failed to create admin account ${username} to config: ${err}`);
                                    res.status(500).send({ success: false, error: "Couldn't write to config file" });
                                    resolve();
                                });
                        });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        success: false,
                        error: err
                    });
                    resolve();
                });
        }).catch(err => {
            res.status(200).json({ success: false, error: `Couldn't connect to main server` });
            resolve();
        });
    });
}
