
exports.up = function(knex, Promise) {


  return knex.schema.createTable('organization', t => {
    t.uuid('id').primary();
    t.string('name').notNullable().unique();
    t.boolean('deleted').defaultTo(false);
    t.timestamps(true, true);
  })


};

exports.down = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex.schema.dropTable('organization'));
};
