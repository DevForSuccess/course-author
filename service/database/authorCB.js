require('dotenv').config();
const faker = require('faker');
var couchbase = require('couchbase');

const host = process.env.CB_HOST;
const username = process.env.CB_USER;
const password = process.env.CB_PASS;
const bucketName = process.env.CB_BUCKET;

const cluster = new couchbase.Cluster('couchbase://' + host,
    {
        username: username,
        password: password
    })
var bucket = cluster.bucket(bucketName);
var collection = bucket.defaultCollection();

async function populateDb() {
    let insertSql, values, query;
    let author_id, first_name, middle_name, last_name, job, employer = '', rating, reviews, students, courses, thumbnail, bio;
    let options;

    for (let i = 1; i <= 100; i++) {
        author_id = i;
        first_name = faker.name.firstName();
        middle_name = faker.name.firstName();
        last_name = faker.name.lastName();
        job = faker.name.title();
        employer = faker.company.companyName();
        rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
        reviews = Math.floor(Math.random() * 100000);
        students = Math.floor(Math.random() * 1000000);
        courses = Math.floor(Math.random() * 90) + 10;
        thumbnail = `https://authors-avatar.s3.amazonaws.com/${i}.jpeg`;
        bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;

        insertSql = `INSERT INTO \'author\' (KEY, VALUE) VALUES $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12`;
        values = [author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio];

        options = { parameters: [author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio] };
        try {
            let queryResult = await cluster.query(insertSql, options);
            queryResult.rows.forEach((row) => {
                console.log('Query row: ', row)
            });
            cluster.close();
        } catch (e) {
            console.log(e);
            throw (e);
        }
    }
}

populateDb();