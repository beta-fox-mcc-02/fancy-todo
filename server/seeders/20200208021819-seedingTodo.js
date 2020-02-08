'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Todos', [
      {
        title : 'John make Doe',
        description : 'is not joe',
        status : true,
        due_date : new Date(),
        createdAt : new Date (),
        updatedAt : new Date ()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Todos', null, {});
  }
};
