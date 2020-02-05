'use strict';
const {hashPassword} = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{
    static associate(models){
      // associations can be defined here
      User.hasMany(models.Todo)
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          args : true,
          msg : `Empty is not Allowed`
        },
        isEmail : {
          args : true,
          msg : `Invalid Email Format`
        },
        notEmpty : {
          args : true,
          msg : `Empty is not Allowed`
        },
        isUnique(value, next){
          sequelize.models.User.findOne({
              where : {
                email : value
              }
            })
            .then(result => {
              if(result && this.id != result.id){
                next('Email is Already Used')
              }
              else next()
            })
            .catch(next)
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [5],
          msg : 'password length minimal 5 characters'
        }
      }
    }
  }, {
    sequelize,
    hooks : {
      beforeCreate: (user, options) => {
        console.log(user)
        // console.log(user.User)
        console.log(user.dataValues.password)
        user.dataValues.password = hashPassword(user.dataValues.password)
      }
      // ,
      // beforeUpdate: (user, options) => {
      //   user.password = hashPassword(user.password)
      // }
    }
  })
  return User;
};