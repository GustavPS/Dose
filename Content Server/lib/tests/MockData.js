const pgp = require('pg-promise')();
const path = require('path');
const fs = require('fs');
const Test = require('./Test');

class MockData {
    constructor() {
        this.configFile = path.join(process.env.TEMP_DIRECTORY, 'test_config.json');
    }

    getConfig() {
        return JSON.parse(fs.readFileSync(this.configFile, 'utf8'));
    }

    async getPgpInstance() {

        const config = this.getConfig();
        const host = config.database.host;
        const port = config.database.port;
        const username = config.database.user;
        const password = config.database.password;
        const databaseName = Test.databaseName;
        return pgp(`postgres://${username}:${password}@${host}:${port}/${databaseName}`);
    }

    async createDummyGenre() {
        const db = await this.getPgpInstance();
        await db.none('INSERT INTO category (imdb_category_id, name) VALUES ($1, $2)', [1, 'test']);
    }
}

module.exports = MockData;