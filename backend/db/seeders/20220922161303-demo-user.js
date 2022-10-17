'use strict';
const bcrypt = require('bcryptjs');

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
   return queryInterface.bulkInsert('Users', [
    {
      email:'user1@gmail.com',
      username: 'User1',
      hashedPassword: bcrypt.hashSync('password1'),
      firstName: 'User1',
      lastName: 'User1Last'
    },
    {
      email: 'user2@gmail.com',
      username: 'User2',
      hashedPassword: bcrypt.hashSync('password2'),
      firstName: 'User2',
      lastName: 'User2Last'
    },
    {
      email: 'user3@gmail.com',
      username: 'user3',
      hashedPassword: bcrypt.hashSync('password3'),
      firstName: 'User3',
      lastName: 'User3Last'
    },
    {
      email: 'user4@gmail.com',
      username: 'user4',
      hashedPassword: bcrypt.hashSync('password4'),
      firstName: 'User4',
      lastName: 'User4Last'
    },
    {
      email: 'user5@gmail.com',
      username: 'user5',
      hashedPassword: bcrypt.hashSync('password5'),
      firstName: 'User5',
      lastName: 'User5Last'
    },
    {
      email: 'user6@gmail.com',
      username: 'user6',
      hashedPassword: bcrypt.hashSync('password6'),
      firstName: 'User6',
      lastName: 'User6Last'
    },
    {
      email: 'user7@gmail.com',
      username: 'user7',
      hashedPassword: bcrypt.hashSync('password7'),
      firstName: 'User7',
      lastName: 'User7Last'
    },
    {
      email: 'user8@gmail.com',
      username: 'user8',
      hashedPassword: bcrypt.hashSync('password8'),
      firstName: 'User8',
      lastName: 'User8Last'
    },
    {
      email: 'user9@gmail.com',
      username: 'user9',
      hashedPassword: bcrypt.hashSync('password9'),
      firstName: 'User9',
      lastName: 'User9Last'
    },
    {
      email: 'user10@gmail.com',
      username: 'user10',
      hashedPassword: bcrypt.hashSync('password10'),
      firstName: 'User10',
      lastName: 'User10Last'
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
