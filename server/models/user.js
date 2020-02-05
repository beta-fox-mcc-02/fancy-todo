'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      // associations can be defined here
      User.hasMany(models.Todo)
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'email sould not be empty'
        },
        isEmail: {
          agrs: true,
          msg: 'not an email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password sould not be empty'
        },
        len: {
          args: [6],
          msg: 'password required minimum length 6'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: function(user, options) {
        console.log(user)
        let hash = hashPassword(user.password)
        user.password = hash
      }
    }
  })

  return User;
};