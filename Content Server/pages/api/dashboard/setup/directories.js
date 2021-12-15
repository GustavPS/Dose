const { readdirSync } = require('fs')
const fs = require('fs');
const validateUser = require('../../../../lib/validateUser');

const getDirectories = (source) =>{
    return readdirSync(source, {withFileTypes: true})
           .filter((dir) => dir.isDirectory())
           .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item.name)) // remove hidden files
           .map((dir) => dir.name);
}

export default function handler(req, res) {
    const token = req.query.token;
    if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
        res.status(403).end();
        resolve();
        return;
    }

    const path = decodeURI(req.query.path.toString()).replace("%2B", "+");
    try {
        if (fs.existsSync(path)) {
            const directories = getDirectories(path);
            res.status(200).json({"directories": directories});
        } else {
            // TODO: Change status code?
            res.status(404).end();
        }
    } catch (err) {
        res.status(400).end();
    }
}