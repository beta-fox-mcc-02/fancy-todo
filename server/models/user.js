'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    email: {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [8],
          msg : 'password length must have at least 8 character'
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user, options) => {
        let encryptPass = encryptPassword(user.password)
        user.password = encryptPass
      }
    }
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};