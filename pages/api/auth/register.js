import { getLocationOrigin } from 'next/dist/next-server/lib/utils';

const db = require('../../../lib/db').default;
const hash = require('./hash');

export default async function handle(req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    try {
        // Check if user exist;
        const user = await db.any('SELECT * FROM users WHERE email=$1 OR username = $2', [email, username]);
        if (user.length !== 0) {
            res.status(200).json({
                status: 'error',
                message: 'Email or username exist'
            });
            return;
        }
        let salt = hash.getSalt(20);
        let hashed = hash.getHash(password, salt);

        await db.none('INSERT INTO users (email, username, password, salt) VALUES($1, $2, $3, $4)', [email, username, hashed, salt]);
        
        res.status(200).json({
            status: 'success',
            message: 'success'
        });
    } catch (e) {
        console.error(e);
        res.status(200).json({
            status: 'error',
            message: 'Database error'
        });
    }
};

