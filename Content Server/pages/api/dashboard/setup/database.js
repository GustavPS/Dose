const pgtools = require('pgtools');
const pgp = require('pg-promise')();
const Config = require('../../../../lib/config');
const Logger = require('../../../../lib/logger');
const logger = new Logger();
const sqlDump = "files/dump.sql";

const importSql = (db) => {
    return new Promise((resolve, reject) => {
        const queries = new pgp.QueryFile(sqlDump, {minify: true});
        db.none(queries)
        .then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

const saveConfig = (databaseConfig) => {
    return new Promise((resolve, reject) => {
        const config = new Config();
        config.getConfig()
        .then(info => {
            info.database = databaseConfig;
            info.setup.database = true;
    
            config.saveConfig(info)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            });
        });
    });


}

const SetupDatabase = (req, res) => {
    const { username, password, port, host, dbName, existingDatabase } = req.body;
    return new Promise(resolve => {
        // Object to create the database
        const config = {
            user: username,
            password: password,
            port: port,
            host: host
        };
        // Object to be saved to config file
        const configDbObject = {
            host: host,
            port: port,
            user: username,
            password: password,
            name: dbName
        };

        pgtools.createdb(config, dbName)
        .then(result => {
            logger.INFO(`Successfully created database ${dbName}`);
            const db = pgp(`postgres://${username}:${password}@${host}:${port}/${dbName}`);
            importSql(db).then(() => {
                logger.INFO(`Successfully imported database ${dbName}`);
                saveConfig(configDbObject).then(() => {
                    logger.INFO(`Successfully saved database info to config file`);
                    res.status(200).send({success: true, message: 'success'});
                    resolve();
                }).catch(err => {
                    logger.ERROR(`Failed to save database ${dbName} to config: ${err}`);
                    res.status(500).send({success: false, message: "config_error"});
                    resolve();
                });
            }).catch(err => {
                logger.ERROR(`Error importing database ${dbName}, error on next line`);
                logger.ERROR(err);
                res.status(500).send({success: false, message: "sql_error"});
                resolve();
            });
        })
        .catch(err => {
            if (err.name === 'duplicate_database' && existingDatabase) {
                logger.INFO(`Database ${dbName} already exists, will use it`);
                saveConfig(configDbObject).then(() => {
                    logger.INFO(`Successfully saved database info to config file`);
                    res.status(200).send({success: true, message: 'success'});
                    resolve();
                }).catch(err => {
                    logger.ERROR(`Failed to save database ${dbName} to config: ${err}`);
                    res.status(500).send({success: false, message: "config_error"});
                    resolve();
                });
            } else {
                logger.ERROR(`Error creating database ${dbName}, error on next line`);
                logger.ERROR(err);
                res.status(500).send({success: false, message: "create_error"});
                resolve();
            }
        });
    });
}

export default SetupDatabase;