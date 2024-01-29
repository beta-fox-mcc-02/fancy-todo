'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class Todo extends Model {
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
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Due date is required'
        },
        isDate: {
          args: true,
          msg: 'Due date must be a date'
        }
      }
    }
  },
  {
    sequelize
  })
  return Todo;
};
