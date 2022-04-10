
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {id: 1, nickname: 'white lotus',species: 'Lotus Flower',h2oFrequency: 'keep water 8-10 inches above soil',owner: '1',},
      ]);
    });
};
