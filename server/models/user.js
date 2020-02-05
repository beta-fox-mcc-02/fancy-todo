'use strict';
module.exports = (sequelize, DataTypes) => {
  const { hash } = require('../helpers/hash')

  class User extends sequelize.Sequelize.Model {
    // static associate(models) {
    //   User.belongsToMany(models.Todo, { through: models.UserTodo })
    // }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email format"
        },
        len: {
          args: [10],
          msg: "The minimum length of email is 10"
        },
        notNull: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: "The minimum length of password is 6"
        },
        notNull: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: user => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};