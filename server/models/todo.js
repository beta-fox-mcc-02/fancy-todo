'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{
    static associate(models) {
      // associations can be defined here
      Todo.belongsToMany(models.User, { through : models.TeamUser})
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