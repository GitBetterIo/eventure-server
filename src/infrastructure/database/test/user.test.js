// just to be 100%
process.env.NODE_ENV = 'test';
require('dotenv').config()
const config = require('../../../config');
const chai = require('chai');
const Database = require('../')(config);
const uuid = require('uuid/v4');

const {assert} = chai;


function truncateAll() {
  return Database.getTableNames().map(name => Database.db.raw(`TRUNCATE TABLE ${name} CASCADE`))
}

describe('Database user profile and login', () => {
  before(done => {
    truncateAll().then(() => done()).catch(done);
  })
  after(done => {
    truncateAll().then(() => done()).catch(done);
  })

  describe("Save()", () => {
    before(done => {
      truncateAll().then(() => done()).catch(done);
    })
    after(done => {
      truncateAll().then(() => done()).catch(done);
    })

    it("inserts a user profile", done => {
      const userData = {
        id: uuid(),
        firstName: 'abc',
        lastName: 'def',
        gender: 'male',
      }
      Database.userProfile.save(userData)
        .then(() => Database.db.raw('SELECT * FROM user_profile'))
        .then(res => res.rows)
        .map(row => Database.db.snakeToCamel(row))
        .then(rows => {
          assert.equal(rows.length, 1);
          assert.equal(rows[0].gender, userData.gender);
          assert.equal(rows[0].firstName, userData.firstName);
          assert.equal(rows[0].lastName, userData.lastName);
          assert.isOk(rows[0].createdAt);
          assert.isOk(rows[0].updatedAt);
          assert.isOk(rows[0].id);
          done();
        })
        .catch(done);
    })

    it("updates a user profile", done => {
      const id = uuid();
      const userData = {
        id: id,
        firstName: 'A',
        lastName: 'B',
        gender: 'C',
      }

      Database.db.raw(`insert into user_profile (id, first_name, last_name, gender) VALUES (:id, :firstName, :lastName, :gender)`, userData)
        .then(() => Database.db.raw('select * FROM user_profile WHERE id=?', [id]))
        .then(resp => Object.assign({}, resp.rows[0]) )
        .then(inserted => Database.db.snakeToCamel(inserted))
        .then(inserted => {
          assert.equal(inserted.id, userData.id);
          assert.equal(inserted.firstName, userData.firstName);
          assert.equal(inserted.lastName, userData.lastName);
          assert.equal(inserted.gender, userData.gender);
          
          return Database.userProfile.save(Object.assign({}, userData, {gender: 'changed'}))
        })
        .then(updated => {
          assert.equal(updated.id, userData.id);
          assert.equal(updated.firstName, userData.firstName);
          assert.equal(updated.lastName, userData.lastName);
          assert.equal(updated.gender, "changed");

          done();
        })
        .catch(done)
    })
  })

})

