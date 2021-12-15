const Config = require('../../../../lib/config');


export default (req, res) => {
    return new Promise(resolve => {
        const config = new Config();
        config.getConfig()
        .then(info => {
            res.status(200).json(info.setup);
            resolve();
        });
    });
}
  