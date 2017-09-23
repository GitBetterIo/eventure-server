
exports.seed = function(knex, Promise) {
  const id = 'd3b86b88-e3e3-4783-b41b-11f43c23ab27';

  // Deletes ALL existing entries
  return knex('organization').del()
    .then(function () {
      // Inserts seed entries
      return knex('organization').insert([
        {id, name: "Test Org"},
      ]);
    });
};
