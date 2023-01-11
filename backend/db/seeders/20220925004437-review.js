// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 1,
      review: "This was an awesome spot!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: "Not lit",
      stars: 1
    },
    {
      spotId: 3,
      userId: 3,
      review: "This was not an awesome spot!",
      stars: 5
    },
    {
      spotId: 4,
      userId: 4,
      review: "This was not an awesome spot!",
      stars: 2
    },
    {
      spotId: 5,
      userId: 5,
      review: "This was not an awesome spot!",
      stars: 4
    },
    {
      spotId: 6,
      userId: 6,
      review: "This was not an awesome spot!",
      stars: 4
    },
    {
      spotId: 7,
      userId: 7,
      review: "This was not an awesome spot!",
      stars: 4
    },
    {
      spotId: 8,
      userId: 8,
      review: "This was not an awesome spot!",
      stars: 4
    },
    {
      spotId: 9,
      userId: 9,
      review: "This was not an awesome spot!",
      stars: 4
    },
    {
      spotId: 10,
      userId: 10,
      review: "This was not an awesome spot!",
      stars: 2
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
