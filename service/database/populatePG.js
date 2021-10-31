require('dotenv').config();
const path = require('path');
const { Pool } = require('pg');
const moment = require('moment');

const host = process.env.PG_HOST;
const port = process.env.PG_PORT;
const database = process.env.PG_DB;
const username = process.env.PG_USER;
const password = process.env.PG_PASS;

const pool = new Pool({
    host: host,
    port: port,
    database: database,
    user: username,
    password: password,
});

const authorCsv = path.join(`${__dirname}/data/authorData.csv`);

const copyCSV = (pathToCopy, tableName) => {
    const copyText = `COPY ${tableName}
    (first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at)
    FROM '${pathToCopy}'
    DELIMITER ','
    CSV HEADER;`;
    return pool.query(copyText);
};

const seedDB = async () => Promise.resolve(pool.connect())
    .then(() => pool.query('SELECT NOW()'))
    .then((result) => {
        console.log('DB connected at ', result.rows[0].now);
        const createSql = `DROP TABLE IF EXISTS author;
        CREATE TABLE author(
        author_id SERIAL PRIMARY KEY,
        first_name VARCHAR(40),
        middle_name VARCHAR(40),
        last_name VARCHAR(40),
        job VARCHAR(100),
        employer VARCHAR(100),
        rating DECIMAL(2,1),
        reviews INTEGER,
        students INTEGER,
        courses INTEGER,
        thumbnail VARCHAR(100),
        bio text,
        created_at timestamp,
        updated_at timestamp
      );`;
        // return pool.query(createSql);
    })
    .then(() => {
        console.log('Table was created successfully!');

        const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
        console.log('Importing csv file to Postgres start time: ', startTime);
        return copyCSV(authorCsv, 'author');
    })
    .then(() => pool.query('SELECT NOW()'))
    .then((result) => {
        console.log('Completed seeding at ', result.rows[0].now);

        const endTime = moment().format('YYYY-MM-DD hh:mm:ss');
        console.log('Importing csv file to Postgres end time: ', endTime);
        return pool.end();
    })
    .catch((error) => {
        console.warn('Error occured: ', error);
    });

seedDB();
