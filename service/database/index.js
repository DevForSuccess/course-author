require('dotenv').config();
const { Pool, Client } = require('pg');

const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const username = process.env.PG_USER;
const password = process.env.PG_PASS;
const database = process.env.PG_DB;

const pool = new Pool({
    user: username,
    host: host,
    database: database,
    password: password,
    port: port,
});

pool.connect();

module.exports = {
    db: pool
}