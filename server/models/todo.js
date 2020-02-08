'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[1],
          msg:'title cant be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[1],
          msg:'description cant be empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args:[1],
          msg:'due date cant be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize })
  return Todo;
};