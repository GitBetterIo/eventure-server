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


});
