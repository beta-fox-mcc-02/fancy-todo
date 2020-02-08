'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"email can't be empty"
          },
          isEmail:{
            args:true,
            msg:'email must contains email character'
          }
        },
        unique:{
          args:true,
          msg:'Email already in use'
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          notNull:{
            args:true,
            msg:"password can't be empty"
          },
          len:{
            args:[5],
            msg:'minimum password length is 5'
          }
        }
      },
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
    return queryInterface.dropTable('Users');
  }
};