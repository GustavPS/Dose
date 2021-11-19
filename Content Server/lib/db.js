const pgp = require('pg-promise')();

// Makes it possible to access process.env from custom server
const env = require('@next/env')
env.loadEnvConfig('./', process.env.NODE_ENV !== 'production')


const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const db = pgp(`postgres://${user}:${password}@${host}:${port}/${database}`);




module.exports = db;