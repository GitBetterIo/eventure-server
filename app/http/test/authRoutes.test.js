const chai = require('chai');
const chaiHttp = require('chai-http');
const uuid = require('uuid/v4');

const {container, truncateAll} = require('./mockApp');
const server = require('../../http')(container);
const {assert} = chai;
const {
  userRoot: User,
  userRepository,
  accessTokenDataStore,
} = container.cradle;

chai.use(chaiHttp);

describe('Authentication Routes', () => {
  const testUserId = uuid();
  const testUserProfile = {
    id: uuid(),
    firstName: 'test',
    lastName: 'userman',
  }
  const testUsername = 'tester';
  const testPassword = 'tester_pass';
  const testEmail = 'tester@test.com';
  const testUserLogin = {
    username: testUsername,
    password: testPassword,
    email: testEmail,
  }
  let testUser;


  before(done => {
    const user = User(testUserProfile).addLogin(testUserLogin);

    truncateAll()
      .then(() => userRepository.save(user) )
      .then(user => testUser = user )
      .then(() => done())
      .catch(done);
  });

  after(done => {
    truncateAll()
      .then(() => done())
      .catch(done);
  })

  it("is alive", done => {
    chai.request(server)
      .get('/info/ping')
      .then(res => {
        assert.propertyVal(res, 'status', 200);
        done();
      })
      .catch(done);
  });


  describe("Login with username and password", () => {

    it("Successfully logs in and receives a token", done => {
      chai.request(server)
        .post('/api/v1/login')
        .send({username: testUsername, password: testPassword})
        .then(res => {
          assert.propertyVal(res, 'status', 200);
          assert.isObject(res.body);
          assert.isString(res.body.token);
          done();
        })
        .catch(done);
    })

    it("Successfully logs out", done => {
      let token;
      chai.request(server)
        .post('/api/v1/login')
        .send({username: testUsername, password: testPassword})
        .then(res => {
          token = res.body.token.token;
          assert.isObject(res.body);
          assert.isString(res.body.token);
          return accessTokenDataStore.findOne({token}, {limit:1});
        })
        .then(tokenRow => {
          assert.isOk(tokenRow);
          const token = tokenRow.token;
          return chai.request(server)
            .post('/api/v1/logout')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              assert.propertyVal(res, 'status', 200);
              return accessTokenDataStore.findOne({token}, {limit:1});
            })
        })
        .then(tokenRow => {
          assert.isNotOk(tokenRow);
          done();
        })
        .catch(done)
    })

    it("rejects bad password", done => {
      chai.request(server)
        .post('/api/v1/login')
        .send({username: testUsername, password: testPassword + 'abc'})
        .then(res => {
          done(new Error('Should have return unauthorized'))
        })
        .catch((err) => {
          assert.propertyVal(err.response, 'status', 401);
          done()
        })
        .catch(done);
    })

    it("denies requests to restricted urls", done => {
      chai.request(server)
        .get('/api/v1/me')
        .then(res => {
          done(new Error('Should have returned unauthorized'))
        })
        .catch(err => {
          assert.equal(err.response.status, 401)
          done();
        })
        .catch(done);
    })

    it("grants access to authenticated requests", done => {
      const token = 'dfad5a63-d1f4-48ab-a3db-c53695e41eaa';
      const tokenData = {
        token,
        userId: testUser.id
      }
      accessTokenDataStore.save(tokenData)
        .then(() => {
          return chai.request(server)
            .get('/api/v1/me')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              assert.equal(res.status, 200);
              done();
            })
            .catch(done)
        })
        .catch(done);
    })
  })


});
