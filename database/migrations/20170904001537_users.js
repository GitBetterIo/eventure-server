
exports.up = async function(knex, Promise) {
   await knex.schema.createTable('person', t => {
    t.uuid('id').primary()
    t.uuid('organization_id')
    t.enum('type', ['participant', 'staff', 'admin']).defaultTo('participant').notNullable()
    
    t.string('first_name')
    t.string('last_name')
    t.string('email')
    t.date('birth_date')
    t.string('gender')
    t.boolean('active').defaultTo('true')
    t.boolean('deleted').defaultTo('false')
    t.timestamps(true, true)
  })

  await knex.schema.raw(`CREATE UNIQUE INDEX person_email_org_uni_idx ON person (email, organization_id)
    WHERE email IS NOT NULL AND organization_id IS NOT NULL;`)

  await knex.schema.raw(`CREATE UNIQUE INDEX person_email_admin_uni_idx ON person (email)
    WHERE email IS NOT NULL AND organization_id IS NULL;`)

  await knex.schema.createTable('person_login', t => {
    t.uuid('id').primary().references('person.id').onDelete('CASCADE');
    
    t.string('password_hash', 500).notNullable();
    t.uuid('password_reset_token');
    t.uuid('registration_token');
    t.dateTime('registration_expire');

    t.timestamp('last_login');

    t.boolean('deleted').defaultTo('false');
    t.timestamps(true, true);
  })

};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('person_login'),
      knex.schema.dropTable('person')
  ])
};
