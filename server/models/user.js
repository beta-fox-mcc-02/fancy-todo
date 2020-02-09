'use strict';
const { hashPassword }= require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{
    static associate(models){
      User.hasMany(models.Todo)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg : "Don't be empty"
        },
        isEmail:{
          msg : "invalid email format"
        }
      }
    },
    password: DataTypes.STRING
  }, 
  {
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