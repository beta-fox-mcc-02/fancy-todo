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
      type: DataTypes.DATE,
      validate: {
        validDueDate(value) {
          if(new Date(value).toISOString().split('T')[0] < new Date().toISOString().split('T')[0]) {
            throw new Error('due date must be today or after this date')
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })
  return Todo;
};