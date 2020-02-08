'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [
    {
      email: 'John@Doe.com',
      password : 1234,
      createdAt : new Date (),
      updatedAt : new Date ()
    },
    {
      email: 'John1@Doe.com',
      password : 1234,
      createdAt : new Date (),
      updatedAt : new Date ()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
