'use strict';
const { hashpwd } = require('../helpers/bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    static associate(models) {
      //associate here
      User.hasMany(models.Todo)
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot null"
        },
        notEmpty: {
          msg: "Password cannot empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Wrong email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "password minimum 3 characters"
        },
        notNull: {
          msg: "Password cannot null"
        },
        notEmpty: {
          msg: "Password cannot empty"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let hashedPassword = hashpwd(user.password)
        user.password = hashedPassword
      },

      beforeBulkUpdate: (user, options) => {
        let hashedPassword = hashpwd(user.password)
        user.password = hashedPassword
      }
    }
  });
  
  return User;
};