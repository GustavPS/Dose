const Config = require('../../../../lib/config');


const SetupStatus = (req, res) => {
    return new Promise(resolve => {
        const config = new Config();
        config.getConfig()
        .then(info => {
            res.status(200).json(info.setup);
            resolve();
        });
    });
}

export default SetupStatus;