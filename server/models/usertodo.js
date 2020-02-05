'use strict';
module.exports = (sequelize, DataTypes) => {
  class UserTodo extends sequelize.Sequelize.Model { }

  UserTodo.init({
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER
  }, { sequelize });
  return UserTodo;
};