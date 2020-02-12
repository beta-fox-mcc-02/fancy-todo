'use strict';
const bcrypt = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class User extends Model {
    // static associate() {

    // }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is incorrect'
        },
        notEmpty: {
          args: true,
          msg: 'Email should be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password should be filled'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashPassword(user.password);
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo, {foreignKey: 'id'})
  };
  return User;
};