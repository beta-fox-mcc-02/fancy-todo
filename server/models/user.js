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
        notNull : {msg : 'Please enter your email'}
      }
    }, 
    password: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {msg: 'Please eneter your password'}
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