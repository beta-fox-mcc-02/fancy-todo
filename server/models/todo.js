'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Todo extends Model {
    static associate(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot empty'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: function(todo, options) {
        todo.status = false
      }
    }
  })
  
  return Todo;
};