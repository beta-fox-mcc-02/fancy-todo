'use strict';
const bcrypt = require('../helper/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:false,
          msg:"email can't be empty"
        },
        isEmail:{
          args:true,
          msg:'email must contains email character'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          args:false,
          msg:"password can't be empty"
        },
        len:{
          args:[3],
          msg:'minimum password length is 3'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (data, options) => {
        const bcryptPass = bcrypt.hashPassword(data.password)
        data.password = bcryptPass
      }
    }
  })
  return User;
};