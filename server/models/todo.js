'use strict';
module.exports = (sequelize, DataTypes) => {
  class Todo extends sequelize.Sequelize.Model{
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }
  Todo.init({
    UserId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [7],
          msg: `task title has to be more than 7`
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: `Status has to be either true or false`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isPast(value) {
          let date = new Date()
          if(date > value) {
            throw new Error( `The time has been past behind` )
          }
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        if (!user.status) user.status = false
        if (!user.description) user.description = `Task Description...`
      },
      afterFind: (user, options) => {
        if(!user) throw new Error()
        else  {
          if(user.length == 0 || !user.length) {
            if(user.description.length > 30) user.description = `${user.description.substring(0, 30)}...`
          }
          else {
            for (let i of user) {
              if(i.description.length > 30) i.description = `${i.description.substring(0, 30)}...`
            }
          }
        }
      }
    }
  })
  return Todo;
};