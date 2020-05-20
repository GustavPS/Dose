const hash = require('../auth/hash');
const db = require('../../../lib/db').default;

export default async function handle(req, res) {
    let user = hash.decodeJWT(req.cookies.token);

    // Not authenticated
    if (user === false) {
        res.status(200).json({
            status: 'error',
            error: 'unauthorized',
            servers: []
        });
        return;
    }
    let servers = await db.any('SELECT server_name, server_ip, server_id FROM server WHERE server_id IN (SELECT server_id FROM user_server WHERE user_id = $1)', [user.userId]);
    res.status(200).json({
        "servers": servers
    });

}