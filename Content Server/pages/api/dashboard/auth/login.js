import Logger from '../../../../lib/logger';
const logger = new Logger();

const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const jwt = require('jsonwebtoken');

export default async function handle(req, res) {
    if (req.method !== 'POST') {
        res.status(404).end();
        return;
    }

    const { username, password } = req.body;

    try {
        let user = await db.any('SELECT password, salt FROM admin WHERE username = $1', [username]);
        if (user.length === 0) {
            res.status(200).json({
                status: 'error',
                message: 'Wrong username/password'
            });
            return;
        }
        user = user[0];
        
        const salt = user.salt;
        const hashed = hash.getHash(password, salt);
        
        user = await db.any('SELECT * FROM admin WHERE username = $1 AND password = $2', [username, hashed]);
        if (user.length === 0) {
            res.status(200).json({
                status: 'error',
                message: 'Wrong username/password'
            });
            return;
        }
        user = user[0];
        const expiresIn = parseInt(process.env.ACCESS_TOKEN_VALID_TIME);
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username
            },
            process.env.DASHBOARD_SECRET,
            {
                expiresIn: expiresIn,
            },
        );
        const validTo = Math.round((Date.now() / 1000) + expiresIn);

        const refreshToken          = hash.generateRefreshToken();
        const encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);
        const encryptedAccessToken  = hash.getHashWithoutSalt(token);

        // Remove old access tokens
        await db.none('DELETE FROM admin_access_token WHERE admin_id = $1', [user.id]);

        db.none('INSERT into admin_access_token (admin_id, access_token, refresh_token) VALUES($1, $2, $3)',[user.id, encryptedAccessToken, encryptedRefreshToken]).then(() => {
            res.status(200).json({
                status: 'success',
                message: 'success',
                token: token,
                refreshToken: refreshToken,
                validTo: validTo
            });
        })
        .catch(err => {
            logger.ERROR(err);
            res.status(200).json({
                status: 'error',
                message: 'Database error'
            });
        });
    } catch (err) {
        logger.ERROR(err);
        res.status(200).json({
            status: 'error',
            message: 'Database error'
        });
    }
};

