'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todo extends Model {
    static associate (models) {
      Todo.belongsTo(models.User)
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'dont allow empty strings'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notToday(value) {
          const dateUser = new Date(value)
          if (dateUser <= new Date()) {
            throw new Error ('expired date')
          }
        }
      }
    }
  }, {
    sequelize
  })

  return Todo;
};