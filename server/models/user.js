'use strict';
const BcryptPassword = require('../helper/encryptPassword.js')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate (models) {
      User.hasMany(models.Todo)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `EMAIL/PASSWORD Invalid`
        },
        emailExist(value, next) {
          User.findOne({
            where: {
              email: value
            }
          })
            .then((data) => {
              if(data) next(`Email Already Exist`)
              else next()
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5],
          msg: `EMAIL/PASSWORD Invalid`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = BcryptPassword.hash(user.password)
      }
    }
  })
  return User;
};