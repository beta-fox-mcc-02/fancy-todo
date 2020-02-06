'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {
    static associate (models) {
      User.hasMany(models.Todo)
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4],
          msg: 'Username length minimal is 4'
        }
      }
      // unique: true,
      // validate: {
      //   isUnique(value, next) {
      //     User
      //       .findOne({
      //         where: {
      //           username: value
      //         }
      //       })
      //       .then(user => {
      //         if(user){
      //           next('Username Already Used')
      //         } else {
      //           next()
      //         }
      //       })
      //       .catch(next)
      //   }
      // }
    },
    email: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email Format is Invalid, Please Check Your Email Format Again !'
        },
        // isUnique(value, next) {
        //   User
        //     .findOne({
        //       where: {
        //         email: value
        //       }
        //     })
        //     .then(user => {
        //       if(user){
        //         next('Email Already Used')
        //       } else {
        //         next()
        //       }
        //     })
        //     .catch(next)
        // },
        notNull: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        len: {
          args: [5],
          msg: 'Minimum password length is 5'
        }
      }
    }
  },
  {
    sequelize,
    hooks: {
      beforeCreate(user) {
        const hash = hashPassword(user.password)
        user.password = hash
      }
    }
  })

  return User;
};