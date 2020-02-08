'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate (models){
      Todo.belongsTo(models.User)
    }
  }

  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notNull : true
      },
      allowNull : false
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId : DataTypes.INTEGER
  },{sequelize})
  return Todo;
};