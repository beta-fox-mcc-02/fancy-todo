'use strict';
const bcrypt = require('../helpers/bycript')

module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model{}

  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (user, options) => {
        let hp = bcrypt.hashPassword(user.password)
        user.password = hp
      }
    }
    ,
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};