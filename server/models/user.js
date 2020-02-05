'use strict';
const { hassPassword } = require('../helpers/password')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
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
          msg: 'Email wrong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8],
          msg: 'minumm character is 8'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        const hash = hassPassword(user.password)
        user.password = hash
      }
    }
  })
  
  return User;
};