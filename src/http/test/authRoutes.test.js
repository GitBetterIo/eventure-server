const chai = require('chai');
const chaiHttp = require('chai-http');
const {config, infrastructure, application, domain, truncateAll} = require('./mockApp');
const server = require('../../http')(config, infrastructure, application, domain);
const {assert} = chai;

chai.use(chaiHttp);


describe('Authentication Routes', () => {
  const testUsername = 'tester';
  const testPassword = 'tester_pass';
  let testUser;


  before(done => {
    const userData = domain.User.setPassword({ username: testUsername }, testPassword);

    truncateAll()
      .then(() => infrastructure.userRepository.save(userData))
      .then(user => testUser = user)
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
        .post('/api/v1/auth/login')
        .send({username: testUsername, password: testPassword})
        .then(res => {
          assert.propertyVal(res, 'status', 200);
          assert.isObject(res.body.token);
          assert.isString(res.body.token.token);
          done();
        })
        .catch(done);
    })

    it("Successfully logs out", done => {
      let token;
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({username: testUsername, password: testPassword})
        .then(res => {
          token = res.body.token.token;
          assert.isObject(res.body.token);
          assert.isString(res.body.token.token);
          return infrastructure.accessTokenService.findToken(token);
        })
        .then(tokenRow => {
          assert.isOk(tokenRow);
          const token = tokenRow.token;
          return chai.request(server)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              assert.propertyVal(res, 'status', 200);
              return infrastructure.accessTokenService.findToken(token);
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
        .post('/api/v1/auth/login')
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
      const sql = `INSERT INTO user_token (token, user_id) VALUES ($1, $2)`;
      infrastructure.db.query(sql, [token, testUser.id])
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
