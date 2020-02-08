'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model;

  class Todo extends Model {
  }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value, next) {
          if(!value) {
            next('Title must be filled');
          } else {
            next();
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty(value, next) {
          if(!value) {
            next(('Description must be filled'));
          } else {
            next();
          }
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty(value, next) {
          if(value === '') {
            next(('Status must be filled'));
          } else {
            next();
          }
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty(value, next) {
          if(!value) {
            next(('Date must be filled'));
          } else {
            next();
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, {foreignKey: 'UserId'})
  };

  return Todo;
};