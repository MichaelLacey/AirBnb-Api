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
   await queryInterface.bulkInsert('Spots',[
    {
      ownerId: 1,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 189
    },
    {
      ownerId:2,
      address: "321 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 154
    },
    {
      ownerId: 3,
      address: "bbb 123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 155.5
    },
    {
      ownerId: 4,
      address: "456 Coding st",
      city: "Anaheim",
      state: "California",
      country: "United States of America",
      lat: 37.7642558,
      lng: 122.4730327,
      name: "Mickeys house",
      description: "Place where you sit back and code" ,
      price: 123.5
    },
    {
      ownerId: 5,
      address: "3422 cocuna ave",
      city: "Newburgh",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The house of wonders",
      description: "Best place to relax",
      price: 211
    },
    {
      ownerId: 6,
      address: "3422 Macon ave",
      city: "Newburgh",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The airbnb house",
      description: "Best place to relax",
      price: 324
    },
    {
      ownerId: 7,
      address: "3422 Point ave",
      city: "Sandy",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The house of tech",
      description: "Best place to relax",
      price: 109.3
    },
    {
      ownerId: 8,
      address: "3422 apple ave",
      city: "San francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The house of graduates",
      description: "Best place to vacay",
      price: 198
    },
    {
      ownerId: 9,
      address: "3422 cocunanaon ave",
      city: "Newburgh",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "The house of wonders",
      description: "Best place to eat fruits",
      price: 89
    },
    {
      ownerId: 10,
      address: "3422 clementine ave",
      city: "Sacramento",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: 122.4730327,
      name: "Fireside Suite",
      description: "Best place to sit by fire",
      price: 169
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
    await queryInterface.bulkDelete('Spots')
  }
};
