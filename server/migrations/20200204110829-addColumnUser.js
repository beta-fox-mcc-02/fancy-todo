'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('Users','Todo',Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('Users','Todo')
  }
};
