'use strict';
const { hashPassword, checkPassword }  = require('../helpers/hashPassword')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const Op    = sequelize.Sequelize.Op
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email format'
        },
        isUnique() {
          return User.findOne({
            where: {
              [Op.and]: [{email: this.email}, {id: {[Op.ne]: this.id}}]
            }
          })
          .then((found) => {
            if (found) {
              throw new Error('email has been used to register')
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      len: {
        args: [6],
        msg: 'minimum 6 characters' 
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });

  return User;
};