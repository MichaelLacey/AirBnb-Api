'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1,
      userId: 1,
      review: "This was an awesome spot!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 1,
      review: "Not lit",
      stars: 1
    },
    {
      spotId: 1,
      userId: 2,
      review: "This was not an awesome spot!",
      stars: 5
    },
    {
      spotId: 2,
      userId: 2,
      review: "This was not an awesome spot!",
      stars: 2
    },
    {
      spotId: 2,
      userId: 3,
      review: "This was not an awesome spot!",
      stars: 4
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews')
  }
};
