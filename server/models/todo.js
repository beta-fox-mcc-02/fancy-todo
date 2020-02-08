'use strict';
const formatDate = require('../helpers/formatDate')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Title is required');
          } else {
            next();
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Description is required');
          } else {
            next();
          }
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Status is required');
          } else {
            next();
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Due date is required');
          } else {
            next();
          }
        },
        isNotYesterday(value, next) {
          if (new Date(value) < new Date(formatDate(new Date))) {
            next('Invalid date')
          } else {
            next()
          }
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('User id is required');
          } else {
            next();
          }
        }
      }
    }
  }, { sequelize })
  return Todo;
};