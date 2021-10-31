require('dotenv').config();
const path = require('path');
const moment = require('moment');
const { exec } = require("child_process");

const host = process.env.CB_HOST;
const username = process.env.CB_USER;
const password = process.env.CB_PASS;
const bucketName = process.env.CB_BUCKET;

const fileName = './database/data/authorData.csv';
// const importStatement = `cbimport csv -c couchbase://127.0.0.1:8091 -u ${username} -p ${password} -b '${bucketName}' -g %author_id% -d file://${fileName}`;
const importStatement = `cbimport csv -c couchbase://127.0.0.1:8091 -u ${username} -p ${password} -b ${bucketName} -g key::%author_id% -d file://${fileName}`;
const startTime = moment().format('YYYY-MM-DD hh:mm:ss');
console.log('Importing csv file to Couchbase start time: ', startTime);
exec(importStatement, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    // console.log(`stdout: ${stdout}`);
    const endTime = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('importing csv file to Couchbase end time: ', endTime);
});