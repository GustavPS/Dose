const db = require('../../../lib/db').default;
const hash = require('./hash');
const jwt = require('jsonwebtoken');

export default async function handle(req, res) {
    if (req.method !== 'POST') {
        res.status(404).end();
        return;
    }

    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await db.any('SELECT password, salt FROM users WHERE username = $1', [username]);
        if (user.length === 0) {
            res.status(200).json({
                status: 'error',
                message: 'Wrong username/password'
            });
            return;
        }
        user = user[0];
        
        let salt = user.salt;
        let hashed = hash.getHash(password, salt);
        
        user = await db.any('SELECT * FROM users WHERE username = $1 AND password = $2', [username, hashed]);
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
                email: user.email,
                username: user.username
            },
            hash.getJWTSecret(),
            {
                expiresIn: expiresIn,
            },
        );
        const validTo = Math.round((Date.now() / 1000) + expiresIn);

        const refreshToken          = hash.generateRefreshToken();
        const encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);
        const encryptedAccessToken  = hash.getHashWithoutSalt(token);

        db.none('INSERT into user_access_token (user_id, access_token, refresh_token) VALUES($1, $2, $3)',[user.id, encryptedAccessToken, encryptedRefreshToken]).then(() => {
            res.status(200).json({
                status: 'success',
                message: 'success',
                token: token,
                refreshToken: refreshToken,
                validTo: validTo
            });
        });
    } catch (e) {
        console.error(e);
        res.status(200).json({
            status: 'error',
            message: 'Database error'
        });
    }
};

