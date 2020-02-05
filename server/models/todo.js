'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [7],
          msg: `task title has to be more than 7 characters`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notIn: {
          args: [[null, '', undefined, NaN]],
          msg: `Description has to be appropriate sentence`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: `Status has to be either true or false`
        }
      }
    },
    due_date: DataTypes.DATE
  }, {
    sequelize,
    hooks: {
      afterFind: (user, options) => {
        if(!user) {
          throw new Error()}
      }
    }
  })
  return Todo;
};