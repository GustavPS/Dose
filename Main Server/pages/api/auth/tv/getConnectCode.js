const hash = require('../hash');
const db = require('../../../../lib/db').default;

export default async function handle(req, res) {
    return new Promise(async (resolve) => {
        let token = req.query.token;
        let user = hash.decodeJWT(token);

        // Not logged-in
        if (!user) {
            res.status(403).end();
            resolve();
            return;
        }
        let code;
        let codeExist = false;
        let tries = 0;
        let codeLength = 4;
        do {
            if (tries % 5 == 0 && tries != 0) {
                codeLength++;
            }
            code = hash.generateConnectCode(codeLength);
            codeExist = (await db.any('SELECT * FROM user_code WHERE code = $1', [code])).length > 0;
            tries++;
        } while(codeExist);

        await db.none("DELETE FROM user_code WHERE user_id = $1", [user.userId]);
        await db.none('INSERT INTO user_code (user_id, code) VALUES ($1, $2)', [user.userId, code]);


        res.status(200).json({
            success: true,
            code: code
        })
        resolve();
    });
}