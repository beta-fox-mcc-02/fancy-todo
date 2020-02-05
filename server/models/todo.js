'use strict';
let curr_date = new Date()
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3],
          msg: 'Minimum title length is 3 characters'
        },
        notNull: {
          args: true,
          msg: 'Required Title'
        }
      },
      allowNull: false
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Value must be either true or false'
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
    sequelize
  })
  return Todo;
};