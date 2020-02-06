'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate (models) {

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
    due_date: DataTypes.DATEONLY,
    UserId: DataTypes.INTEGER
  },
  {
    sequelize
  })

  return Todo;
};