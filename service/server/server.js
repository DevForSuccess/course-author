require('newrelic');
const { Author } = require('./models');
const express = require('express');

const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(express.static(__dirname + '/../public'));

let i = 1;
app.get('/api/author?:authorId', function (req, res) {
    let authorId = req.query.authorId;
    // console.log(authorId, ' : ', new Date().getSeconds());
    Author.get(authorId, function (err, authorObj) {
        if (err) {
            res.status(404).send([]);
        } else {
            if (!authorObj) {
                res.status(200).send({ message: 'AuthorId not found' });
            } else {
                res.status(200).send({
                    'author_id': authorObj.author_id,
                    'first_name': authorObj.first_name,
                    'middle_Name': authorObj.middle_name,
                    'last_name': authorObj.last_name,
                    'job': authorObj.job,
                    'employer': authorObj.employer,
                    'rating': authorObj.rating,
                    'reviews': authorObj.reviews,
                    'students': authorObj.students,
                    'courses': authorObj.courses,
                    'thumbnail': authorObj.thumbnail,
                    'bio': authorObj.bio
                });
            }
        }
    });
});

app.post('/api/author', function (req, res) {
    const data = [];
    let author = req.body;
    let date = new Date();
    console.log(date.getSeconds(), ':', date.getMilliseconds());
    author.bio = `${author.first_name} ${author.middle_name} ${author.last_name} works for ${author.employer}`;

    Author.save(author, (err, result) => {
        if (!err) {
            res.status(201).send(author);
        }
    });
});

app.put('/api/author?:authorId', function (req, res) {
    let author = req.body;
    console.log('PUT METHOD =====> ', req.body);
    author.author_id = req.query.authorId;
    author.bio = `${author.first_name} ${author.middle_name} ${author.last_name} works for ${author.employer}`;
    Author.update(author, (err, result) => {
        if (err) {
            res.status(404).send('failed to update');
        } else {
            res.status(200).send(author);
        }
    });
});

app.delete('/api/author?:authorId', function (req, res) {
    let authorId = req.query.authorId;
    Author.delete(authorId, (err, result) => {
        if (err) {
            res.status(404).send('failed to delete');
        } else {
            res.status(200).send(`Author id: ${authorId} has been deleted!`);
        }
    });
});

module.exports = app;
