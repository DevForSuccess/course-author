require('dotenv').config();
const faker = require('faker');
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

const createTable = () => {
    const createSql = `DROP TABLE IF EXISTS authors;
                       CREATE TABLE authors (
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
                          bio TEXT,
                          created_at TIMESTAMP,
                          updated_at TIMESTAMP
                       )`;

    pool.query(createSql, values, (err, res) => {
        if (err) {
            console.log(err.stack);
            return err;
        } else {
            console.log(res);
            return res;
        }
    })
}

const seed = () => {
    let insertSql, values;
    let author_id, first_name, middle_name, last_name, job, employer = '', rating, reviews, students, courses, thumbnail, bio;

    for (let i = 1; i <= 10000000; i++) {
        // author_id = i;
        first_name = faker.name.firstName();
        middle_name = faker.name.firstName();
        last_name = faker.name.lastName();
        job = faker.name.title();
        employer = faker.company.companyName();
        rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
        reviews = Math.floor(Math.random() * 100000);
        students = Math.floor(Math.random() * 1000000);
        courses = Math.floor(Math.random() * 90) + 10;
        thumbnail = `https://author-avatars.s3.amazonaws.com/${i}.jpeg`;
        bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;

        insertSql = 'INSERT INTO authors VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        values = [first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio];

        pool.query(insertSql, values, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows[0].author_id);
            }
        })
    }
}

(async function () {
    const client = await pool.connect();
    seed();
    client.release();
})()

module.exports = {
    seed
};