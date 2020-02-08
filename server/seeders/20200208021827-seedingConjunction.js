'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
   return queryInterface.bulkInsert('TeamUsers', [
      {
        UserId : 1,
        TodoId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        UserId : 2,
        TodoId : 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
