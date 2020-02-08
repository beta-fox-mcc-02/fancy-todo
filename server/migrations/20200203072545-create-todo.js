'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull:{
            args:true,
            msg:"title cant be empty"
          }
        }
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull:{
            args:true,
            msg:"description cant be empty"
          }
        }
      },
      status: Sequelize.BOOLEAN,
      due_date: Sequelize.DATE,
      UserId: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos');
  }
};