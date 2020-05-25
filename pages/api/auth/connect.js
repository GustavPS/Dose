import { getLocationOrigin } from 'next/dist/next-server/lib/utils';

const db = require('../../../lib/db').default;
const hash = require('./hash');
const jwt = require('jsonwebtoken');

export default async function handle(req, res) {
    return new Promise(resolve => {
        let code = req.body.code;

        db.any('SELECT users.id, users.username, users.email FROM users, user_code WHERE user_code.code = $1 AND user_code.confirmed = true AND users.id = user_code.user_id', [code])
        .then(result => {
            if (result.length === 1) {
                let user = result[0];
                const token = jwt.sign(
                    {
                        userId: user.id,
                        email: user.email,
                        username: user.username
                    },
                    hash.getJWTSecret(),
                    {
                        expiresIn: 300000, // 50 min
                    },
                );
        
                res.status(200).json({
                    status: 'success',
                    message: 'success',
                    token: token
                });
            } else {
                res.status(200).json({
                    status: 'denied',
                    message: 'denied',
                    token: ''
                });
            }
            resolve();
        });
    });


};

