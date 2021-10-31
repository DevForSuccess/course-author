const AWS = require('aws-sdk');
const axios = require('axios');
const db = require('./author.js');
const faker = require('faker');

if (process.argv[2] === 'fill') {
  const pkg = require('./../aws.config.js');
  const { AWSAccessKeyId, AWSSecretKey, Bucket } = pkg;

  const s3 = new AWS.S3({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
  });

  const params = {
    Bucket: Bucket,
    CreateBucketConfiguration: {
      LocationConstraint: 'us-east-1'
    }
  }

  const emptyBucket = async () => {
    console.log('Emptying bucket ', Bucket);
    const { Contents } = await s3.listObjects({ Bucket: Bucket }).promise();
    if (Contents.length > 0) {
      await s3.deleteObjects({
        Bucket: Bucket,
        Delete: {
          Objects: Contents.map(({ Key }) => ({ Key }))
        }
      })
        .promise();
    }
    return true;
  };

  const uploadFile = async (fileContent, fileName) => {
    console.log('Uploading:', fileName);
    const params = {
      Bucket: Bucket,
      Key: fileName,
      Body: fileContent,
      ContentType: 'image/jpeg'
    };

    return await s3.upload(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return `Uploaded: ${data.key}`;
      }
    }).promise();
  };

  const imager = async function(i) {
    try {
      let res = await axios({
        url: 'https://thispersondoesnotexist.com/image',
        method: 'GET',
        timeout: 1000,
        headers: {
          'Content-Type': 'image/jpeg'
        }
      });
      if (res.status === 200) {
        let image = Buffer.from(res.data);
        let result = await uploadFile(image, `${i}.jpg`);
        console.log(result);
      }
      return
    }
    catch(err) {console.log(err)}
  };

  const bucketfill = async function() {
    for (i = 1; i <= 100; i++) {
      await imager(i);
    }
  };
};
const create = function() {
  const data = [];
  let firstName, middleName, lastName, job, employer = '', image;
  for (let i = 1; i <= 10000000; i++) {
    // console.log('index', i);
    firstName = faker.name.firstName();
    middleName = faker.name.firstName();
    lastName = faker.name.lastName();
    job = faker.name.title();
    employer = faker.company.companyName();
    bio = `${firstName} ${middleName} ${lastName} has a BS in ${faker.name.jobDescriptor()} ${faker.name.jobArea()} from ${faker.address.city()} University and years of experience as a professional instructor for ${faker.name.jobDescriptor()} ${faker.name.jobArea()}. ${lastName} has publications and patents in various fields such as ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, and ${faker.hacker.adjective()} ${faker.hacker.ingverb()}. Over the course of ${lastName}'s career, they have developed a skill set in ${faker.hacker.ingverb()}, and they hope to use their experience in teaching to help other people learn the power of ${faker.hacker.adjective()} ${faker.hacker.ingverb()}, as well as ${faker.hacker.ingverb()} the ${faker.hacker.noun()}. Currently ${lastName} works as ${job} for ${employer} and provides in-person training courses to employees working at top companies, including ${faker.company.companyName()}, ${faker.company.companyName()}, ${faker.company.companyName()}, ${faker.company.companyName()}, and many more. Feel free to contact them on LinkedIn for more information on in-person training sessions or group training sessions in ${faker.address.city()}.`
    data.push({
      'authorId': i,
      'firstName': firstName,
      'middleName': middleName,
      'lastName': lastName,
      'job': job,
      'employer': employer,
      'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
      'reviews': Math.floor(Math.random() * 100000),
      'students': Math.floor(Math.random() * 1000000),
      'courses': Math.floor(Math.random() * 90) + 10,
      'thumbnail': `https://author-avatars.s3.amazonaws.com/${i}.jpeg`,
      'bio': bio
    });
  }
  db.save(data, (err, result) => {
  });
}

if (process.argv[2] === 'empty') {
  emptyBucket();
} else if (process.argv[2] === 'fill') {
  bucketfill();
} else {
  create();
}

