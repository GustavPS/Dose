const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const validateUser = require('../../../../lib/validateUser');
const Logger = require('../../../../lib/logger');
const logger = new Logger();

export default (req, res) => {
    const { username, password, token } = req.body;
    if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
        res.status(403).json({
            success: false,
            error: 'Invalid token'
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
        const salt = hash.getSalt(20);
        const hashed = hash.getHash(password, salt);
        db.any(`SELECT * FROM admin WHERE username = $1`, [username]).then(data => {
            if (data.length > 0) {
                logger.DEBUG(`Admin ${username} already exists`);
                res.status(406).json({
                    success: false,
                    error: 'Admin already exists'
                }); // 406 Not Acceptable
                return;
            }
            db.none('INSERT INTO admin (username, password, salt) VALUES ($1, $2, $3)', [username, hashed, salt]).then(() => {
                res.status(200).json({
                    success: true
                });
                logger.INFO(`Added admin with username ${username}`);
                resolve();
            }).catch(err => {
                logger.ERROR(`Failed to add admin with username ${username}. ${err}`);
                res.status(500).json({
                    success: false,
                    error: err
                });
                resolve();
            });
        });
    });
}
