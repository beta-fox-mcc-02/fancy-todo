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
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: function(value, next) {
          let args = new Date(new Date().setDate(new Date().getDate() - 1))
          if (new Date(value) <= args) {
            next('required date after yesterday')
          } else {
            next()
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    hooks: {
      beforeCreate: function(todo, options) {
        todo.status = false
      },
      afterFind: function(todos, options) {
        if (Array.isArray(todos)) {
          todos.forEach(todo => {
            let date = todo.due_date;
            let month = date.getUTCMonth() + 1;
            let day = date.getUTCDate();
            let year = date.getUTCFullYear();
            let newdate = month + "/" + day + "/" + year;
            todo.due_date = newdate
          })
        } else {
          let date = todos.due_date;
          let month = date.getUTCMonth() + 1;
          let day = date.getUTCDate();
          let year = date.getUTCFullYear();
          let newdate = month + "/" + day + "/" + year;
          todos.due_date = newdate
        }
      }
    }
  })
  
  return Todo;
};