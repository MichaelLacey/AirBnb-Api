// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options,[
    {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "Rhinebeck",
      state: "New York",
      country: "United States",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "Architectural wonder in the woods",
      description: "4 guests • studio • 2 beds • 2 baths",
      price: 475
    },
    {
      ownerId:2,
      address: "321 Disney Lane",
      city: "Nashville",
      state: "Tennessee",
      country: "United States",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "JT luxury Villa",
      description: "4 guest • 2 bedrooms • 4 beds • 2 baths",
      price: 322
    },
    {
      ownerId: 3,
      address: "432 ottawa Ln",
      city: "Val-des-Monts",
      state: "Quebec",
      country: "Canada",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Lake Front Cottage ",
      description: "12 guests • 4 bedrooms • 6 beds • 2 baths",
      price: 282
    },
    {
      ownerId: 4,
      address: "456 Coding st",
      city: "Westpot",
      state: "Connecticut",
      country: "United States",
      lat: 37.7642558,
      lng: 122.4730327,
      name: "Sunny Westport Studio Apt",
      description: "4 guests • 1 bedroom • 2 beds • 1 bath" ,
      price: 176.99
    },
    {
      ownerId: 5,
      address: "3422 cocuna ave",
      city: "West Olive",
      state: "Michigan",
      country: "United States",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Hanging Oasis in the Trees",
      description: "4 guests • 1 bedroom • 2 beds • 1 bath",
      price: 79
    },
    {
      ownerId: 6,
      address: "103 Pacifico",
      city: "Coco",
      state: "Guanacaste Province",
      country: "Costa Rica",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Casa Sea la Vie",
      description: "12 guests • 6 bedroom • 6 beds • 6.5 bath",
      price: 767
    },
    {
      ownerId: 7,
      address: "3422 Point ave",
      city: "Blue Ridge",
      state: "Georgia",
      country: "United States",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Private Mountain Retreat",
      description: "10 guests • 4 bedroom • 7 beds • 3 bath",
      price: 273
    },
    {
      ownerId: 8,
      address: "3422 apple ave",
      city: "Springfield",
      state: "Missouri",
      country: "United States",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Unique 'Earthouse' Retreat",
      description: "6 guests • 3 bedroom • 4 beds • 3 bath",
      price: 347
    },
    {
      ownerId: 9,
      address: "3422 cocunanaon ave",
      city: "Pownal",
      state: "Vermont",
      country: "United States",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Cozy mini-house",
      description: "2 guests • 1 bedroom • 1 beds • 1 bath",
      price: 252
    },
    {
      ownerId: 10,
      address: "3422 clementine ave",
      city: "Spicewood",
      state: "Texas",
      country: "United States",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The Treehouse Family Nest",
      description: "6 guests • 2 bedroom • 3 beds • 1 bath",
      price: 595
    }

   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
