'use strict';
const { hashPassword } = require('../helpers/bcrypt');
const fullDate = new Date();
const year = fullDate.getFullYear();
const month = fullDate.getMonth();
const date = fullDate.getDate();
console.log(date);
const yesterday = `${year}-${month + 1}-${date}`;
// console.log('YESTERDAY=>>', new Date(yesterday).toISOString());
// console.log('NOW=>>>', new Date());

module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "Title should not be empty" }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { args: true, msg: "Description should not be empty" }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: { args: true, msg: "Only accept date" },
        isAfter: { args: new Date(yesterday).toISOString(), msg: "Invalid date" }
      }
    }
  }, {
    sequelize
  })


  return Todo;
};