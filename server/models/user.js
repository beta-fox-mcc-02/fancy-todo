'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    };
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Please provide a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        console.log('HOOOOOOOOOOOOOOOOOOKS')
        let hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
        console.log(user.password)
      }
    },
    sequelize
  })
  return User;
};