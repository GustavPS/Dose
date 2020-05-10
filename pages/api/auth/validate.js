const hash = require('../auth/hash');


export default async function handle(req, res) {
    let user = hash.decodeJWT(req.body.token);
    let username = '';

    // Not authenticated
    if (user !== false) {
        username = user.username;
    }
    res.status(200).json({
        valid: user !== false,
        username: username
    });
};

