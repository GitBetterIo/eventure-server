const chai = require('chai');
const chaiHttp = require('chai-http');
const {config, infrastructure, application, domain, truncateAll} = require('./mockApp');
const server = require('../../http')(config, infrastructure, application, domain);
const {assert} = chai;

chai.use(chaiHttp);


describe.only('Authentication Routes', () => {
  const testUser = 'tester';
  const testPass = 'tester_pass';

  before(done => {
    const userData = application.userService.setPassword({ username: testUser }, testPass);

    truncateAll()
      .then(() => application.userRepository.save(userData))
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
        .send({username: testUser, password: testPass})
        .then(res => {
          assert.propertyVal(res, 'status', 200);
          assert.isString(res.body.token);
          done();
        })
        .catch(done);
    })

    it("Successfully logs out", done => {
      let token;
      chai.request(server)
        .post('/api/v1/auth/login')
        .send({username: testUser, password: testPass})
        .then(res => {
          token = res.body.token;
          assert.isString(token);
          return application.tokenRepository.findToken(token);
        })
        .then(tokenRow => {
          assert.isOk(tokenRow);
          return chai.request(server)
            .post('/api/v1/auth/logout')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
              assert.propertyVal(res, 'status', 200);
              return application.tokenRepository.findToken(token);
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
        .send({username: testUser, password: testPass + 'abc'})
        .then(res => {
          done(new Error('Should have return unauthorized'))
        })
        .catch((err) => {
          assert.propertyVal(err.response, 'status', 401);
          done()
        });
    })
  })


});
