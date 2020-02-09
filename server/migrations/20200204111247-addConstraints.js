'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addConstraint('Users', ['email'], {
     type: 'unique',
     name: 'costum_unique_constraint_name'
   })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeConstraint('Users', 'costum_unique_constraint_name', {})
  }
};
