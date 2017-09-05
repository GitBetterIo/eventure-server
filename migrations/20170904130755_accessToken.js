
exports.up = function(knex, Promise) {
  return knex.schema.createTable('access_token', t => {
    t.uuid('token').primary();
    t.uuid('user_id').references('user_login.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('access_token');
};
