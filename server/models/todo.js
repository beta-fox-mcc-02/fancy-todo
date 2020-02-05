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
        notEmpty: false,
        notNull: true
      },
      allowNull: false
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    priority: DataTypes.STRING,
    location: DataTypes.JSON,
    due_date: DataTypes.DATE
  }, { sequelize });
  return Todo;
};