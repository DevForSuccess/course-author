const path = require('path');
const db = require('../database/overview.js');
const f = require('./fixtures.js');
const supertest = require('supertest');
const app = require('../server/server.js');
const request = supertest(app);
import 'regenerator-runtime/runtime';


describe('Server methods are working', () => {
  let server, agent;
  beforeEach((done) => {
      server = app.listen(7357, (err) => {
        if (err) return done(err);
        done();
      });
  });
  afterEach((done) => {
    server.close(done);
  });
  test('can retrieve course info with the /overview?:courseId endpoint', async (done) => {
    request.get('/overview?courseId=1')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  test('fails to retrieve info from /overview?:courseId with an invalid courseId', async (done) => {
    const response = await request.get('/overview?courseId=0');
    expect(response.status).toEqual(404);
    done();
  });
});


