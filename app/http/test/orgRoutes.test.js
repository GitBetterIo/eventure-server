const chai = require('chai');
const chaiHttp = require('chai-http');
const {container, truncateAll} = require('./mockApp');
const server = require('../../http')(container);
const {assert} = chai;

chai.use(chaiHttp);


describe.skip('Organization Routes', () => {
  const testUsername = 'tester';
  const testPassword = 'tester_pass';
  const organizations = [
    {name: "Org1"},
    {name: "Org2"},
    {name: "Org3"},
  ];
  let testUser;
  let token;


  before(done => {
    const userData = domain.User.setPassword({ username: testUsername }, testPassword);

    truncateAll()
      .then(() => infrastructure.userRepository.save(userData))
      .then(() => Promise.all(organizations.map(org => infrastructure.organizationRepository.save(org))))
      .then(() => {
        return chai.request(server)
          .post('/api/v1/auth/login')
          .send({username: testUsername, password: testPassword})
          .then(res => {
            token = res.body.token.token;
          })
      })
      .then(() => done())
      .catch(done);
  });

  after(done => {
    truncateAll()
      .then(() => done())
      .catch(done);
  })

  it("gets a list of organizations", done => {
    chai.request(server)
      .get('/api/v1/organization')
      .set('Authorization', `Bearer ${token}`)
      .then(res => {
        assert.propertyVal(res, 'status', 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 3);
        done();
      })
      .catch(done);
  });



});
