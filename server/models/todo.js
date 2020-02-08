'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Todo extends Model {
    static associate (models) {
      this.belongsTo(models.User)
    }
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        isTitle : (value) => {
          if(!value) {
            throw new Error ('title is required')
          }
        },
        notNull : true, 
        notEmpty: true
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        isDesc : (value) => {
          if(!value) {
            throw new Error ('description is required')
          }
        },
        notEmpty : true
      }
    },
    status: {
      type : DataTypes.BOOLEAN,
      defaultValue : false
    },
    due_date: {
      type : DataTypes.DATE,
      validate : {
        notEmpty : true
      }
    }, 
    UserId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize
  })

  return Todo;
};