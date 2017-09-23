
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_profile', t => {
        t.uuid('id').primary();
        t.string('first_name');
        t.string('last_name');
        t.date('birth_date');
        t.string('gender');
        t.boolean('deleted').defaultTo('false');
        t.timestamps(true, true);
    }),

    knex.schema.createTable('user_login', t => {
      t.uuid('id').primary().references('user_profile.id').onDelete('CASCADE');
      t.string('username').notNullable();
      t.string('email').notNullable();
      t.string('password_hash', 500).notNullable();

      t.uuid('password_reset_token');
      t.uuid('registration_token');
      t.dateTime('registration_expire');

      t.timestamp('last_login');

      t.boolean('deleted').defaultTo('false');
      t.timestamps(true, true);
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('user_login'),
      knex.schema.dropTable('user_profile')
  ])
};
