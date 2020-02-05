'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  const { hash } = require('../helpers/bcrypt');
  
  class User extends Model{
    static associate (models) {
      // associations can be defined here
      User.hasMany(models.Todo);
    };
  }

  User.init({
    email: {
      type : DataTypes.STRING,
      validate: {
        notEmpty:{
          args:true,
          msg:"Not Empty Require"
        },
        isEmail : {
          args:true,
          msg:"Not Email Format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
            args:[6],
            msg:"Minimum 6 characters required"
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate: (user, option) => {
        user.password = hash(user.password);
      }
    }
  })
  

  return User;
};