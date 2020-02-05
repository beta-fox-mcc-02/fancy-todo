'use strict';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{
    static associate(models){
      User.hasMany(models.Todo)

    
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate:(user, options) => {
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    }
  });
 
  return User;
};