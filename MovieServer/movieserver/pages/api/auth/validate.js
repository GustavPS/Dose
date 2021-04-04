const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const cors = require('../../../lib/cors');
const db = require('../.././../lib/db');

export default async (req, res) => {
    return new Promise(async (resolve) => {
    res = cors(res);
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: req.body.token,
            }),
        })
        .then((r) => r.json())
        .then((data) => {
            if (data.valid) {
                db.any('SELECT id FROM users WHERE username = $1', [data.username])
                    .then(user => {
                        if(user.length == 1) {
                            user = user[0];

                            const expiresIn = parseInt(process.env.ACCESS_TOKEN_VALID_TIME);
                            const token = jwt.sign(
                                {
                                    username: data.username,
                                    user_id: user.id
                                },
                                process.env.SECRET,
                                {
                                    expiresIn: expiresIn
                                },
                            );
                            const validTo = Math.round((Date.now() / 1000) + expiresIn);

                            res.status(200).json({
                                status: 'success',
                                token: token,
                                validTo: validTo
                            });
                            resolve();
                        } else {
                            res.status(200).json({
                                status: 'error',
                                error: 'User not found in database'
                            });
                            resolve();
                        }
                });
            } else {
                res.status(200).json({
                    status: 'error',
                    error: 'Not a valid token'
                })
                resolve();
            }
        });
  });
}