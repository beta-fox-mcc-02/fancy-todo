'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'Email_unique'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'Email_unique')
  }
};
