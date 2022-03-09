const pgp = require('pg-promise')();
const path = require('path');
const fs = require('fs');
const env = require('@next/env');
env.loadEnvConfig('./', process.env.NODE_ENV !== 'production');

// Shouldn't be global but has to be because of nextjs.
// For updates: https://github.com/vercel/next.js/discussions/31978
if (!global.db) {
    try {
        let configPath;
        if (process.env.TEST === 'TRUE') {
            configPath = path.join(process.env.TEMP_DIRECTORY, 'test_config.json');
        } else {
            configPath = path.join(process.env.TEMP_DIRECTORY, 'config.json');
        }
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const user = config.database.user;
        const password = config.database.password;
        const host = config.database.host;
        const port = config.database.port;
        const database = config.database.name;
        const string = `postgres://${user}:${password}@${host}:${port}/${database}`;
        global.db = pgp(string);
    } catch (e) {
        console.warn('Could not connect to database');
    }

}

module.exports = global.db;