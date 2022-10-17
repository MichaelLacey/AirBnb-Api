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
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId:1,
      userId:1,
      startDate: "2025-11-24",
      endDate: "2025-11-25"
    },
    {
      spotId:2,
      userId:2,
      startDate: "2025-12-24",
      endDate: "2025-12-25"
    },
    {
      spotId:3,
      userId:3,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:4,
      userId:4,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:4,
      userId:4,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:5,
      userId:5,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:6,
      userId:6,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:7,
      userId:7,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:8,
      userId:8,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },
    {
      spotId:9,
      userId:9,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
    },{
      spotId:10,
      userId:10,
      startDate: "2025-10-24",
      endDate: "2025-10-25"
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
    await queryInterface.bulkDelete('Bookings')
  }
};
