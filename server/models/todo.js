'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
 
  Todo.init({
    title:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Title is not empty'
        }
      }
    }, 
    description: DataTypes.STRING, 
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter : `${new Date().toLocaleDateString()}`
        // "2020-02-07"
      }
    }, 
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  })

  return Todo;
};