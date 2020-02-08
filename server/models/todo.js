'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  }

  Todo.init ({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Title can't be empty, please fill the title`
        },
        notNull: {
          args: true,
          msg: 'Title is still null'
        }
      },
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Description can't be empty, please fill the description`
        },
        notNull: {
          args: true,
          msg: 'Description is still null'
        }
      },
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: `Status can't be empty, please fill the status`
        },
        notNull: {
          args: true,
          msg: 'Status is still null'
        }
      },
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `Date can't be empty, please fill the due_date`
        },
        isDate: {
          args: true,
          msg: `Date format: YYYY-DD-MM`
        },
        notNull: {
          args: true,
          msg: 'Date is still null'
        },
        notToday(value) {
          const dateUser = new Date(value)
          if (dateUser < new Date()) {
            throw new Error (`choose future date`)
          }
        }
      },
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {sequelize});
  
  return Todo;
};