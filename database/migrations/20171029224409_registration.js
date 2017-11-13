
exports.up = function(knex, Promise) {
  return knex.schema.createTable('registration', t => {
    t.uuid('id').primary()
    t.uuid('organization_id').notNullable().references('organization.id').onDelete('CASCADE')
    t.uuid('eventure_id').notNullable().references('eventure.id').onDelete('CASCADE')
    t.uuid('listing_id').notNullable().references('eventure_listing.id').onDelete('CASCADE')
    t.uuid('group_id')
    t.uuid('participant_id').notNullable()
    t.uuid('registrant_id').notNullable()
    t.boolean('deleted').defaultTo(false)
    t.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('registration')
};
