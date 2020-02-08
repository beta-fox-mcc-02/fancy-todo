'use strict';
const Bycrsptjs = require('../helper/bycrspt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    static associate = function(models) {
      // associations can be defined here
      User.hasMany(models.Todo)
    };
  }
  User.init({
    email : {
      type : DataTypes.STRING,
      // validate : {
      //   isEmail : true
      // }
    },
    password : {
      type : DataTypes.STRING
    },
    TodoId : {
      type : DataTypes.INTEGER,
    }
  },{sequelize,
  hooks : {
    beforeCreate : (user,options) => {
      const pass1 = Bycrsptjs.hiddenPass(user.password)
      user.password = pass1
    }
  }
  })
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});

  return User;
};