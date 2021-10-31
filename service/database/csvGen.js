const fs = require('fs');
const faker = require('faker');
const path = require('path');
const moment = require('moment');

const authorCsv = path.join(`${__dirname}/data/authorData.csv`);
let args = process.argv.slice(2);
args = args.map(arg => parseInt(arg));

const populateAuthor = (records => {
    let author_id, first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at;
    let commaPos;
    const header = 'first_name,middle_name,last_name,job,employer,rating,reviews,students,courses,thumbnail,bio,created_at,updated_at';

    const authorStream = fs.createWriteStream(authorCsv, { flags: 'a' });
    
    if (records[0] === 0 ) {
        authorStream.write(`${header}\n`);
        authorStream.end();
        return;
    }

    let authorObj;

    const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('creating csv file start time: ', startTime);

    for (let i = records[0]; i <= records[1]; i++) {
        author_id = i;
        first_name = faker.name.firstName();
        middle_name = faker.name.firstName();
        last_name = faker.name.lastName();
        job = faker.name.title();
        employer = faker.company.companyName();
        commaPos = employer.indexOf(',');
        if (commaPos >= 0) {
            employer = employer.substring(0, commaPos);
        }
        rating = (Number.parseFloat((Math.random() * 2) + 3).toFixed(1));
        reviews = Math.floor(Math.random() * 100000);
        students = Math.floor(Math.random() * 1000000);
        courses = Math.floor(Math.random() * 90) + 10;
        thumbnail = `https://authors-avatar.s3.amazonaws.com/${i}.jpg`;
        bio = `${first_name} ${middle_name} ${last_name} has a BS in ${faker.name.jobDescriptor()}.`;
        created_at = moment().format('YYYY-MM-DD hh:mm:ss');
        updated_at = moment().format('YYYY-MM-DD hh:mm:ss');

        authorObj = [first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at];
        authorStream.write(`${authorObj}\n`);
    }
    authorStream.end();

    const endTime = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('creating csv file end time: ', endTime);
});

// let recordsArr = [0, [1, 1000000], [1000001, 2000000], [2000001, 3000000], [4000001, 5000000], [5000001, 6000000], [6000001, 7000000], [7000001, 8000000], [8000001, 9000000], [9000001, 10000000]];
populateAuthor(args);