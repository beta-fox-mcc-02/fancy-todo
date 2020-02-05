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
    description: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [20],
          msg : 'Minimal description length is 20'
        }
      }
    }, 
    status: {
      type : DataTypes.BOOLEAN
      // validate : {
      //   isIn : {
      //     args : [[false, true]],
      //     msg : 'Just false or true'
      //   } 
      // }
    },
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  })

  return Todo;
};