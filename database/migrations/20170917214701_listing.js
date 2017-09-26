
exports.up = function(knex, Promise) {
  return knex.schema.createTable('eventure_listing', t => {
    t.uuid('id').primary()
    t.uuid('organization_id').notNullable().references('organization.id').onDelete('CASCADE')
    t.uuid('eventure_id').notNullable().references('eventure.id').onDelete('CASCADE')
    t.string('name').notNullable()
    t.string('slug').notNullable()
    t.text('description')
    t.date('start_date').notNullable()
    t.date('end_date').notNullable()
    t.json('settings').notNullable().defaultTo('{}')
    t.boolean('deleted').defaultTo(false)
    t.timestamps(true, true)

    t.unique(['eventure_id', 'name'])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('eventure_listing')
};
