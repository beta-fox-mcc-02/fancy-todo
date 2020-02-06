'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{}
  
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "title shouldn't be empty"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "description shouldn't be empty"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isDate : {
          msg : "type must be date"
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {
    sequelize
  })

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};