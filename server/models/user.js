'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required email'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      },
      unique: {
        args: true,
        msg: 'email has already existed'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'required password'
        },
        len: {
          args: [6],
          msg: 'Minimum password length: 6 characters'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let hash = hashPassword(user.password);
        user.password = hash 
      }
    }
  })
  return User;
};