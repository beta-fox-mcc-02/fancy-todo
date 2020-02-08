'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */

        return Promise.all([
            queryInterface.addColumn('Todos', 'location', Sequelize.STRING),
            queryInterface.addColumn('Todos', 'weather', Sequelize.STRING)
        ])
    },

    down: (queryInterface, Sequelize) => {
        /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
      	*/
        return Promise.all([
            queryInterface.removeColumn('Todos', 'location'),
            queryInterface.removeColumn('Todos', 'weather')
        ])
    }
}
