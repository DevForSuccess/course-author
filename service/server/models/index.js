const { result } = require('lodash');
var { db } = require('../../database');

module.exports = {
    Author: {
        get: function (authorId, cb) {
            let queryString = `SELECT * FROM author WHERE author.author_id = ${authorId};`;
            let queryArgs = [];
            db.query(queryString, queryArgs, (err, result) => {
                if (err) {
                    console.log(err.stack);
                    cb(err, null);
                } else {
                    cb(null, result.rows[0]);
                }
            });
        },
        save: function (author, cb) {
            const queryString = `INSERT INTO author (first_name, middle_name, last_name, job, employer, rating, reviews, students, courses, thumbnail, bio, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;

            const queryArgs = [author.first_name, author.middle_name, author.last_name, author.job, author.employer, author.rating, author.reviews, author.students, author.courses, author.thumbnail, author.bio, author.created_at, author.updated_at];

            db.query(queryString, queryArgs, (err, res) => {
                if (err) {
                    console.log(err.stack);
                    cb(err, null);
                } else {
                    cb(null, res.rowCount);
                }
            });
        },
        update: function (author, cb) {
            const queryString = `UPDATE author SET first_name = ($1), middle_name = ($2), last_name = ($3), job = ($4), employer = ($5), rating = ($6), reviews = ($7), students = ($8), courses = ($9), thumbnail = ($10), bio = ($11), created_at = ($12), updated_at = ($13) WHERE author.author_id = ($14);`;

            console.log(author);
            const queryArgs = [author.first_name, author.middle_name, author.last_name, author.job, author.employer, author.rating, author.reviews, author.students, author.courses, author.thumbnail, author.bio, author.created_at, author.updated_at, author.author_id];

            db.query(queryString, queryArgs, (err, result) => {
                if (err) {
                    console.log(err.stack);
                    cb(err, null);
                } else {
                    cb(null, result.rowCount);
                }
            });
        },
        delete: function (authorId, cb) {
            let queryString = `DELETE FROM author WHERE author.author_id = ${authorId};`;
            let queryArgs = [];
            db.query(queryString, queryArgs, (err, result) => {
                if (err) {
                    console.log(err.stack);
                    cb(err, null);
                } else {
                    cb(null, result.rowCount)
                }

            });
        },
    }
};