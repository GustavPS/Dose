const hash = require('../hash');
const db = require('../../../../lib/db').default;
const jwt = require('jsonwebtoken');

export default async function handle(req, res) {
    return new Promise(async (resolve) => {
        let code = req.query.code;

        db.one('SELECT user_id FROM user_code WHERE code = $1', [code])
        .then(result => {
            db.none("DELETE FROM user_code WHERE user_id = $1", [result.user_id]);
            console.log(result.user_id);
            db.one('SELECT username, email, id FROM users WHERE id = $1', [result.user_id])
            .then(user => {
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
                    resolve();
                });
            })
            .catch(err => {
                // Couldn't find user, should never happen
                res.status(200).json({
                    status: 'fail',
                    message: "Couldn't find user"
                })
                resolve();
            })
        })
        .catch(err => {
            // Couldn't find code
            res.status(200).json({
                status: 'fail',
                message: "Couldn't find code"
            })
            resolve();
        });
    });
}