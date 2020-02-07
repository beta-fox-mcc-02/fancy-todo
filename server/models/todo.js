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
          // console.log(value, 'ini dari value validate')
          const dateUser = new Date(value)
          // console.log(dateUser, 'ini konvert tanggal')
          // console.log(dateUser <= new Date())
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