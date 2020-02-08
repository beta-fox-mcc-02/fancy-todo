'use strict';
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require("sequelize")
  const hashBcrypt = require("../helpers/bcrypt");


  class User extends Model {
    associate = function (models) {
      // associations can be defined here
      User.hasMany(models.Todo)
    };
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password must be at least 6 characters"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashBcrypt.hash(user.password)
      }
    }
  })

  return User;
};