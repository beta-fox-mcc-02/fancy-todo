'use strict';
const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    associate(models){
      User.hasMany(models.Todo);
    }
  }

  User.init({
    email: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate : {
        isEmail :{args: true, msg: "Invalid email"},
        notNull: {args: true, msg: "Email should not be empty"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {args: true, msg: "Password should not be empty"},
        len: {args: [7], msg: "Password must have minimal seven characters"}
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options){
        user.password = hashPassword(user.password);
      }
    }
  })

  return User;
};