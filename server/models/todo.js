'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todo extends Model {
    static associate(models){
      // associations can be defined here
      Todo.belongsTo(models.User)
    }
  }

  Todo.init({
    title: {
      type : DataTypes.STRING, 
      validate : {
        notEmpty : {
          msg : 'Column tidak boleh kosong'
        }
      }
    },
    description: {
      type : DataTypes.STRING, 
      validate : {
        notEmpty : {
          msg : 'Column tidak boleh kosong'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, 
  {
    sequelize
  })


  return Todo;
};