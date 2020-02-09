'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.addColumn('Todos', 'UserId', Sequelize.INTEGER)
    .then()
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.removeColumn('Todos', 'UserId');
  }
};
