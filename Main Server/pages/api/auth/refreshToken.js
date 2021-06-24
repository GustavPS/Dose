const hash = require('../auth/hash');
const db = require('../../../lib/db').default;
const jwt = require('jsonwebtoken');

const MONTH_IN_SECONDS = 2629743;

export default async function handle(req, res) {
    return new Promise(async (resolve) => {
        let token = req.body.token;
        let refreshToken = req.body.refreshToken;

        let user = hash.decodeJWT(token, true);

        // Access token does not exist
        if (!user) {
            res.status(200).json({
                status: 'fail',
                message: 'No match'
            });
            resolve();
            return;
        }

        let encryptedToken = hash.getHashWithoutSalt(token);
        let encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);

        db.one('SELECT * FROM user_access_token WHERE user_id = $1 AND access_token = $2 AND refresh_token = $3', [user.userId, encryptedToken, encryptedRefreshToken]).then(result => {

            db.none('DELETE FROM user_access_token WHERE user_id = $1 AND access_token = $2 AND refresh_token = $3', [user.userId, encryptedToken, encryptedRefreshToken]).then(result => {

                // Check if refresh token has expired
                const refreshTokenValidTo = user.exp * 1000;
                const currentDate = Date.now();
                const secondsSinceExpiry = (currentDate - refreshTokenValidTo) / 1000;
                if (secondsSinceExpiry >= MONTH_IN_SECONDS) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Refresh token expired'
                    });
                    resolve();
                    return;
                }

                const expiresIn = parseInt(process.env.ACCESS_TOKEN_VALID_TIME);
                let newToken = jwt.sign(
                    {
                        userId: user.userId,
                        email: user.email,
                        username: user.username
                    },
                    hash.getJWTSecret(),
                    {
                        expiresIn: expiresIn, // 1h
                    },
                );

                const validTo = Math.round((Date.now() / 1000) + expiresIn);

                refreshToken = hash.generateRefreshToken();
                encryptedToken = hash.getHashWithoutSalt(newToken);
                encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);

                db.none('INSERT into user_access_token (user_id, access_token, refresh_token) VALUES($1, $2, $3)',[user.userId, encryptedToken, encryptedRefreshToken]).then(() => {
                    res.status(200).json({
                        status: 'success',
                        message: 'success',
                        token: newToken,
                        refreshToken: refreshToken,
                        validTo: validTo
                    });
                    resolve();
                    console.log("REFRESHED TOKEN");
                });
            });
        }).catch(err => {
            console.log(err);
            // Pair between access token and refresh token does not exist
            res.status(200).json({
                status: 'fail',
                message: 'No match'
            });
            resolve();
        });
    });
}; 