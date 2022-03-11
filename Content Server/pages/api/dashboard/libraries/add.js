const db = require('../../../../lib/db');
const hash = require('../../../../lib/hash');
const Logger = require('../../../../lib/logger');
const Watcher = require('../../../../lib/watcher');
const CommonEvent = require('../../../../lib/events/CommonEvent');
const validateUser = require('../../../../lib/validateUser');
const logger = new Logger();

const validateLibraries = (libraries) => {
    const errors = [];

    for (const library of libraries) {
        if (!library.name) {
            errors.push(`Library name is required for ${library.path}`);
        }
        if (!library.path) {
            errors.push(`Library path is required for ${library.name}`);
        }
    }

    for (let i = 0; i < libraries.length; i++) {
        for (let j = i + 1; j < libraries.length; j++) {
            if (libraries[i].path === libraries[j].path && i !== j) {
                errors.push(`Duplicate library path ${libraries[i].path}`);
                break;
            } else if (libraries[i].name === libraries[j].name && i !== j) {
                errors.push(`Duplicate library name ${libraries[i].name}`);
                break;
            }
        }
    }
    return errors;
}


export default (req, res) => {
    const libraries = req.body.libraries;

    if (!Array.isArray(libraries)) {
        res.status(400).send('Libraries must be an array');
        return;
    }

    if (libraries.length > 10) {
        res.status(400).send('You can only add 10 libraries at a time');
        return;
    }

    return new Promise(async (resolve) => {
        const token = req.query.token;
        if (!validateUser(token, process.env.DASHBOARD_SECRET)) {
            res.status(403).end();
            resolve();
            return;
        }

        const watcher = new Watcher();
        await watcher.fetchLibraries(false);

        const errors = validateLibraries(libraries.concat(watcher.libraries));
        if (errors.length > 0) {
            res.status(200).send({
                errors: errors,
                success: false
            });
            resolve();
        } else {
            const promises = [];
            for (const library of libraries) {
                promises.push(db.one('INSERT INTO library (name, path, type) VALUES ($1, $2, $3) RETURNING id', [library.name, library.path, library.type], c => +c.id));
                logger.INFO(`Adding library ${library.name} with path ${library.path}`);
            }

            Promise.all(promises).then((ids) => {
                res.status(200).send({
                    success: true,
                    message: 'Libraries inserted successfully'
                });

                // IDs are returned in the same order as the libraries were inserted
                for (let i = 0; i < libraries.length; i++) {
                    libraries[i].id = ids[i];
                }
                CommonEvent.emit('library.new', libraries);
                resolve();
            })
            .catch(err => {
                res.status(200).send({
                    success: false,
                    message: err.message
                });
                logger.ERROR(`Error inserting libraries: ${err}`);
                resolve();
            })
        }
    });
}
  