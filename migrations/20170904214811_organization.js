
exports.up = function(knex, Promise) {


  return knex.schema.createTable('organization', t => {
    t.uuid('id').primary();
    t.string('name').notNullable();
    t.boolean('deleted').defaultTo(false);
    t.timestamps(true, true);
  })
    .then(() => 
      knex.schema.table('user_profile', t=>{
        t.uuid('organization_id').references('organization.id');
      })
    )
    .then(() => 
      knex.schema.table('user_login', t=>{
        t.uuid('organization_id').references('organization.id');
      })
    )


};

exports.down = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex.schema.table('user_login', t => t.dropColumn(organization_id)) )
    .then(() => knex.schema.table('user_profile', t => t.dropColumn(organization_id)) )
    .then(() => knex.schema.dropTable('organization'));
};
