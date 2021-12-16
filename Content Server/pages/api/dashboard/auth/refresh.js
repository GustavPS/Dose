const Logger = require('../../../../lib/logger');
const hash = require('../../../../lib/hash');
const db = require('../../../../lib/db');
const jwt = require('jsonwebtoken');

const logger = new Logger();
const MONTH_IN_SECONDS = 2629743;

export default async function handle(req, res) {
    return new Promise(async (resolve) => {
        let token = req.body.token;
        let refreshToken = req.body.refreshToken;
        let user;

        hash.decodeJWT(token, true, process.env.DASHBOARD_SECRET)
            .then(user => {
                db.one('SELECT * FROM admin_access_token WHERE admin_id = $1 AND access_token = $2 AND refresh_token = $3', [user.userId, encryptedToken, encryptedRefreshToken]).then(result => {

                    db.none('DELETE FROM admin_access_token WHERE admin_id = $1 AND access_token = $2 AND refresh_token = $3', [user.userId, encryptedToken, encryptedRefreshToken]).then(result => {

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
                        const newToken = jwt.sign(
                            {
                                userId: user.userId,
                                username: user.username
                            },
                            process.env.DASHBOARD_SECRET,
                            {
                                expiresIn: expiresIn,
                            },
                        );

                        const validTo = Math.round((Date.now() / 1000) + expiresIn);

                        refreshToken = hash.generateRefreshToken();
                        encryptedToken = hash.getHashWithoutSalt(newToken);
                        encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);

                        db.none('INSERT into admin_access_token (admin_id, access_token, refresh_token) VALUES($1, $2, $3)', [user.userId, encryptedToken, encryptedRefreshToken]).then(() => {
                            res.status(200).json({
                                status: 'success',
                                message: 'success',
                                token: newToken,
                                refreshToken: refreshToken,
                                validTo: validTo
                            });
                            resolve();
                        });
                    });
                }).catch(err => {
                    logger.WARNING(`Failed to refresh Dashboard token. Error: ${err}`);
                    // Pair between access token and refresh token does not exist
                    res.status(200).json({
                        status: 'fail',
                        message: 'No match'
                    });
                    resolve();
                });
            })
            .catch(err => {
                logger.WARNING(`Dashboard Refresh token/Access token does not exist. Error: ${err}`);
                // Access token does not exist
                if (!user) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'No match'
                    });
                    resolve();
                    return;
                }
            });
        let encryptedToken = hash.getHashWithoutSalt(token);
        let encryptedRefreshToken = hash.getHashWithoutSalt(refreshToken);


    });
}; 