'use strict';
module.exports = (sequelize, DataTypes) => {

  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init ({
    title: {
      type: DataTypes.STRING,
      allowNull : false
    },
    description: {
      type: DataTypes.STRING,
      allowNull : false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
    due_date: DataTypes.DATE,
    UserId : DataTypes.INTEGER
  }, {sequelize});

  return Todo;
};