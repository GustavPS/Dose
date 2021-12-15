const path = require('path');
const fs  = require('fs');
const fsPromises = require('fs').promises;
// Makes it possible to access process.env from custom server
const env = require('@next/env');
env.loadEnvConfig('./', process.env.NODE_ENV !== 'production');


const configPath = path.join(process.env.TEMP_DIRECTORY, 'config.json');

class Config {
    static #CONFIG_EXIST_CALL_COUNT = 0;
    static #CREATE_CONFIG_CALL_COUNT = 0;

    static DATABASE_CONFIG = {};

    static getDefaultConfig() {
        return {
            database: {
                host: '',
                password: '',
                port: '',
                user: '',
                name: '',
                done: false
            },
            setup: {
                done: false,
                database: false,
                admin: false
            },
            mainServer: ''
        }
    }

    async getConfig() {
        return JSON.parse(await fsPromises.readFile(configPath));
    }

    async saveConfig(config) {
        await fsPromises.writeFile(configPath, JSON.stringify(config, null, 4));
    }

    static setDatabaseConfig(databaseConfig) {
        Config.DATABASE_CONFIG = databaseConfig;
        module.exports.database = databaseConfig;
    }

    async getDatabaseConfigFromFile() {
        return this.getConfig().then(config => {
            return config.database;
        });
    }

    async isSetupDone() {
        return this.getConfig().then(config => config.setup.done);
    }

    async isDatabaseConfigured() {
        return this.getConfig().then(config => config.database.done);
    }

    /** Functions below should ONLY be used by server.js **/
    static doesConfigExist() {
        if (Config.#CONFIG_EXIST_CALL_COUNT !== 0) {
            throw new Error('Config.doesConfigExist() should only be called once');
        } else {
            Config.#CONFIG_EXIST_CALL_COUNT++;
            // OK to use sync here because we're only checking if the file exists when the server starts
            return fs.existsSync(configPath);
        }
    }

    static async createConfig() {
        if (Config.#CREATE_CONFIG_CALL_COUNT !== 0) {
            throw new Error('Config.createConfig() should only be called once');
        } else {
            Config.#CREATE_CONFIG_CALL_COUNT++;
            const config = Config.getDefaultConfig();
            await fsPromises.writeFile(configPath, JSON.stringify(config, null, 4));
        }
    }
}

module.exports = Config;
module.exports.database = {};