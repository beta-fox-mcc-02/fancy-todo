'use strict';
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User);
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      // validate: {
      //   notEmpty: {args: true, msg: "Title should not be empty"}
      // }
    },
    description: {
      type: DataTypes.STRING,
      // validate: {
      //   notEmpty: {args: true, msg: "Description should not be empty"}
      // }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      // validate: {
      //   isDate: {args: true, msg: "Only accept date"}
      // }
    }
  }, {
    sequelize
  })


  return Todo;
};