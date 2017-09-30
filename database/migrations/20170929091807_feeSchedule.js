
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('fee_schedule', t => {
    t.uuid('id').primary()
    t.uuid('organization_id').notNullable().references('organization.id').onDelete('CASCADE')
    t.uuid('eventure_id').notNullable().references('eventure.id').onDelete('CASCADE')
    t.uuid('listing_id').notNullable().references('eventure_listing.id').onDelete('CASCADE')
    t.date('fee_date').notNullable().defaultTo(knex.fn.now())
    t.decimal('fee').notNullable()
    t.timestamps(true, true)

    t.unique(['listing_id', 'fee_date'])
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('fee_schedule')
};
