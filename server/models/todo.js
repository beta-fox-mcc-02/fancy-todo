'use strict';
const validHelper = require('../helpers/validHelper')
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{}
  // console.log(costomValid());
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
        isAfter : {
          args : validHelper(),
          msg : "invalid date" 
        },
        isDate : {
          msg : "invalid date"
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