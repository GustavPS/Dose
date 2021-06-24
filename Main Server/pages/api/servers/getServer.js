const hash = require('../auth/hash');
const db = require('../../../lib/db').default;

export default async function handle(req, res) {
    let server = await db.any('SELECT server_name, server_ip, server_id FROM server WHERE server_id = $1', [req.body.id]);
    if (server.length === 0) {
        res.status(200).json({
            status: 'error',
            error: 'server_no_exist',
            server: {}
        });
        return;
    }

    res.status(200).json({
        status: 'success',
        server: server[0]
    });

}