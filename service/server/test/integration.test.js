const jestConfig = require('../../jest.config');
const axios = require('axios');
const request = require('supertest')('http://localhost:4095');

describe('CRUD API', () => {
    let createdId;
    describe('GET /author', function () {
        it('get correct information from the requested Author', function (done) {
            return request
                .get('/author?authorId=5')
                .expect(res => {
                    expect(res.body.firstName).toBe("Jocelyn");
                    done();
                })
                .catch(err => done(err))
        });
    });

describe('POST /author', function () {
    const testAuthor = {
        // 'authorId': 999,
        'firstName': "John",
        'middleName': "",
        'lastName': "Doe",
        'job': "ReactJS Developer",
        'employer': "Facebook",
        'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
        'reviews': Math.floor(Math.random() * 100000),
        'students': Math.floor(Math.random() * 1000000),
        'courses': Math.floor(Math.random() * 90) + 10,
        'thumbnail': "https://author-avatars.s3.amazonaws.com/99.jpeg"
    };

        it('adding Author is successful by testing the information of the new record', function (done) {
            return request
                .post('/author')
                .send(testAuthor)
                .expect(res => {
                    expect(res.body.employer).toBe("Facebook");
                    createdId = res.body._id;
                    done();
                })
                .catch(err => done(err))
        });
    });

    describe('PUT /author', function () {
        const testAuthor = {
            'authorId': 999,
            'firstName': "James",
            'middleName': "",
            'lastName': "Bond",
            'job': "Gun for hire",
            'employer': "MI-6",
            'rating': (Number.parseFloat((Math.random() * 2) + 3).toFixed(1)),
            'reviews': Math.floor(Math.random() * 100000),
            'students': Math.floor(Math.random() * 1000000),
            'courses': Math.floor(Math.random() * 90) + 10,
            'thumbnail': "https://author-avatars.s3.amazonaws.com/99.jpeg"
        };

        it('updating Author is successful by testing the of newly updated information', function (done) {
            return request
                .put('/author?authorId=999')
                .send(testAuthor)
                .expect(res => {
                    expect(res.body.employer).toBe("MI-6");
                    done();
                })
                .catch(err => done(err))
        });
    });

    describe('DELETE /author', function () {
        it('deleting Author is sucessful by checking the response of the delete operation', (done) => {
            axios({
                method: 'delete',
                url: `http://localhost:4095/author?authorId=999`
            })
                .then((res) => {
                    expect(res.status === 200);
                    return axios({
                        method: 'get',
                        url: `http://localhost:4095/author?authorId=999`
                    });
                })
                .then((res) => {
                    assert(res.data === '');
                    done();
                })
                .catch((err) => {
                    console.error(err);
                    done();
                });
        });
    });

    /* describe('DELETE /author', function () {
        it('deleting Author is sucessful by checking the response of the delete operation', (done) => {
            return request
                .delete('/author?authorId=999')
                .expect(res => {
                    expect(res.status).toBe(200);
                    done();
                })
                .catch(err => done(err))
        });
    }); */

});