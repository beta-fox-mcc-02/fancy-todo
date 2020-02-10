'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate (models) {
      Todo.belongsTo(models.User)
    }
  }
  
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: 'Title Length Minimal is 2'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: 'Description Length Minimal is 2'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Date Cannot be Empty'
        },
        isToday (v) {
          let date = new Date()
          if(new Date(v) < date) {
            throw new Error(`Date cannot be less than or today`)
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  },
  {
    sequelize
  })

  return Todo;
};