import { getLocationOrigin } from 'next/dist/next-server/lib/utils';

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
                message: 'Wrong username'
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
                message: 'Wrong password'
            });
            return;
        }
        user = user[0];

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username: user.username
            },
            hash.getJWTSecret(),
            {
                expiresIn: 3000, // 50 min
            },
        );

        res.status(200).json({
            status: 'success',
            message: 'success',
            token: token
        });
    } catch (e) {
        console.error(e);
        res.status(200).json({
            status: 'error',
            message: 'Database error'
        });
    }
};

