'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model{
    static associate(models){
      Todo.belongsTo(models.User)
    }
  }
  Todo.init ({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'cannot be empty'
        }
      }
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'cannot be empty'
        },
        notToday(value){
          var ToDate = new Date();
          if(new Date(value) <= ToDate.getTime()){
            throw new Error('date cannot be now')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });
  return Todo;
};