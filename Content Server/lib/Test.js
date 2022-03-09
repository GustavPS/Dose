const pgtools = require('pgtools');
const fs = require('fs');
const pgp = require('pg-promise')();
const path = require('path');

class Test {
    #databaseName = "TestMovieServer";
    #sqlDump = "files/dump.sql";

    constructor(configFile) {
        const testConfigPath = path.join(process.env.TEMP_DIRECTORY, 'test_config.json');
        fs.copyFileSync(configFile, testConfigPath);

        const data = JSON.parse(fs.readFileSync(testConfigPath));
        data.database.name = this.#databaseName;
        fs.writeFileSync(testConfigPath, JSON.stringify(data, null, 4));

        this.configFile = testConfigPath;
    }

    getConfig() {
        return JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
    }

    createDatabase(host, port, username, password, databaseName) {
        return new Promise((resolve, reject) => {
            const db = {
                user: username,
                password: password,
                host: host,
                port: port,
            };

            pgtools.createdb(db, databaseName)
                .then(result => {
                    resolve();
                }).catch(err => {
                    reject(err);
                });
        });
    }

    dropDatabase(host, port, username, password, databaseName) {
        return new Promise((resolve, reject) => {
            const db = {
                user: username,
                password: password,
                host: host,
                port: port,
            };

            pgtools.dropdb(db, databaseName)
                .then(result => {
                    resolve();
                }).catch(err => {
                    resolve();
                });
        });
    }

    importSql(dbString, sqlDump) {
        return new Promise((resolve, reject) => {
            const queries = new pgp.QueryFile(sqlDump, { minify: true });
            dbString.none(queries)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    async createDummyUser() {
        const config = this.getConfig();
        const host = config.database.host;
        const port = config.database.port;
        const username = config.database.user;
        const password = config.database.password;
        const databaseName = this.#databaseName;
        const db = await this.getPgpInstance(host, port, username, password, databaseName);

        await db.none('INSERT INTO users (username, has_access) VALUES ($1, $2)', ['test', true]);
    }

    async getPgpInstance(host, port, username, password, databaseName) {
        return pgp(`postgres://${username}:${password}@${host}:${port}/${databaseName}`);
    }

    async setupTestEnvironment() {
        const config = this.getConfig();
        const host = config.database.host;
        const port = config.database.port;
        const username = config.database.user;
        const password = config.database.password;

        return this.dropDatabase(host, port, username, password, this.#databaseName)
            .then(() => this.createDatabase(host, port, username, password, this.#databaseName))
            .then(() => this.getPgpInstance(host, port, username, password, this.#databaseName))
            .then(db => this.importSql(db, this.#sqlDump))
    }
}

module.exports = Test;