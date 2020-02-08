'use strict';
const { encryptPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate (models) {
      this.hasMany(models.Todo)
    }
  }

  User.init({
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [5],
          msg : 'password length must have at least 5 character'
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
  
  return User;
};