'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Todo extends Model{
    static associate (models) {
      // associations can be defined here
      Todo.belongsTo(models.User);
    };
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Not Empty Require"
        },
        len:{
            args:[4],
            msg:"Minimum 4 characters required"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE
  }, {
    sequelize
  })

  return Todo;
};