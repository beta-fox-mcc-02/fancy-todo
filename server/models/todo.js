'use strict';
module.exports = (sequelize, DataTypes) => {
  const {
    Model
  } = require("sequelize")

  class Todo extends Model {
    associate = function (models) {
      // associations can be defined here
      Todo.belongsTo(models.User)
    };
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [7],
          msg: "must contain at least 7 characters"
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [
            ['true', 'false']
          ],
          msg: "must be filled with true or false only"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    hooks: {
      afterFind: (data, options) => {
        if (!data) {
          throw new Error
        }
      },
      beforeDestroy: (data, options) => {
        if (!data) {
          throw new Error
        }
      }
    }
  })

  return Todo;
};