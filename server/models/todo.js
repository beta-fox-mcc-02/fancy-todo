'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{
    static associate(models) {
      // associations can be defined here
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'empty is not allowed'
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'empty is not allowed'
        }
      }
    },
    status: {
      type : DataTypes.BOOLEAN
      // ,
      // validate : {
      //   notEmpty : {
      //     args : true,
      //     msg : 'empty is not allowed'
      //   }
      // }
    },
    UserId : {
      type : DataTypes.INTEGER
    },
    due_date: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : {
          args : true,
          msg : 'empty is not allowed'
        }
      }
    }
  }, {
    sequelize
  }); 
  return Todo;
};