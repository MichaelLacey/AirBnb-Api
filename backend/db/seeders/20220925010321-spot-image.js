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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/0e022b3d-a7da-4662-acbf-46fda3a357e4.jpg",
      preview: true
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-52226205/original/b0b701fd-5b02-4703-ab51-fa0794a4b91b.jpeg",
      preview: true
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/773a2e4a-09af-473b-b0fe-ef76290a139a.jpg",
      // Idk what preview false means or true
      preview: true
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/b3230aef-bba9-4490-b366-1b0d22ba1c45.jpg",
      preview: true
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/45ba1f97-3925-4ea5-911f-c69aa27090cd.jpg",
      preview: true
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53849285/original/01a4b4f2-2624-4003-8076-bcd7bdbea997.jpeg",
      preview: true
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/d7b0d920-3c97-45e4-a8dd-093fbcb5a774.jpg",
      preview: true
    },
    {
      spotId:8,
      url: "https://a0.muscache.com/im/pictures/d5c9dbf4-4f19-4bf8-8a5c-a27c3c024878.jpg",
      preview: true
    },
    {
      spotId:9,
      url: "https://a0.muscache.com/im/pictures/81a34902-f3a8-4127-9cb6-675ed251f8d3.jpg",
      preview: true
    },
    {
      spotId:10,
      url: "https://a0.muscache.com/im/pictures/3ff78e6e-046a-4b1d-aabe-355a2bda305b.jpg",
      preview: true
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages')
  }
};
