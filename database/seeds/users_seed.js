const bcrypt = require('bcrypt');
const uuid = require('uuid/v4')

const hashPassword = plaintextPassword => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plaintextPassword, salt)
}

exports.seed = function(knex, Promise) {
  const id = uuid();

  return knex('user_profile').del()
    .then(function () {
      return knex('user_profile').insert([
        {id},
      ]);
    })
    .then(() => knex('user_login').insert([
      {id, email: 'aaron@topshelfrobot', username: 'aaron', password_hash: hashPassword('password')},
    ]))
};
