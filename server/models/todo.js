'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsToMany(models.User, { through: models.UserTodo })
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      },
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      },
      allowNull: false
    },
    status: DataTypes.BOOLEAN,
    priority: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        notNull: true
      },
      allowNull: false
    },
    location: {
      type: DataTypes.JSON,
      validate: {
        notEmpty: true,
        notNull: true
      },
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true,
        notNull: true
      },
      allowNull: false
    }
  }, { sequelize });
  return Todo;
};