'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  }

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : 'Please enter your email'
        },
        notEmpty : {
          args : true,
          msg : 'Please enter your email'
        } 
      }
    }, 
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {msg: 'Please enter your password'},
        notEmpty :{
          args : true,
          msg : 'Please enter your password'
        },

        // -- Use this password validation if you want more secret with contain a lowercase, a upercase, number, and min length password ----
        containTheFollowing(value, next) {
          if (value.length >= 8) {
            let aLowerCase = 0
            let aUpperCase = 0
            let number = 0
            let dictLowerCase = 'abcdefghijklmnopqrstuvwqyz'
            let dictUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWQYZ'
            for (let i = 0; i < value.length; i++) {
              for (let j = 0; j < dictLowerCase.length; j++) {
                if (value[i] === dictLowerCase[j]) {
                  aLowerCase = 1
                }
              }
              for (let k = 0; k < dictUpperCase.length; k++) {
                if (value[i] === dictUpperCase[k]) {
                  aUpperCase = 1
                }
              }
              if (isNaN(+value[i]) === false) {
                number = 1
              }
            }
            let total = aLowerCase + aUpperCase + number
            if (total === 3) {
              next()
            } else  {
              let err = {
                name : "Validation Password",
                msg : "Must have a lower case, a upper case, and number"
              }
              next(err)
            }
          } else {
            let err = {
              name : "Validation Password",
              msg : "Must have Minimum 8 Character, a lower case, a upper case, and number" 
            }
            next(err)
          }
        }
      }
    } 
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user, options) => {
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  })

  return User;
};