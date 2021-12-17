import Logger from '../../../../lib/logger';
const logger = new Logger();

const db = require('../../../../lib/db');
const cors = require('../../../../lib/cors');
const validateUser = require('../../../../lib/validateUser');

export default (req, res) => {
    res = cors(res);
    const { token, id } = req.query;
    const user = validateUser(token, process.env.DASHBOARD_SECRET);
    if (!user) {
        res.status(403).end();
        return;
    } else if (user.userId == id) {
        res.status(406).json({
            success: false,
            error: 'You cannot delete yourself'
        }); // 406 Not Acceptable
        return;
    }

    db.none(`DELETE FROM admin WHERE id = $1`, [id]);
    logger.INFO(`Deleted admin with id ${id}`);
    res.status(200).json({
        success: true
    })
}