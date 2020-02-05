'use strict'
const { getWeather } = require('../helpers/weather')
module.exports = (sequelize, DataTypes) => {
    class Todo extends sequelize.Sequelize.Model {
        static associate(models) {
            Todo.belongsTo(models.User)
        }
    }

    Todo.init(
        {
            title: {
                type: DataTypes.STRING,
                validate: {
                    notNull: {
                        msg: 'Please enter the title'
                    }
                },
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    notNull: {
                        msg: 'Please enter the description'
                    }
                },
                allowNull: false
            },
            status: {
                type: DataTypes.BOOLEAN,
                validate: {
                    notNull: {
                        msg: 'Please enter the status'
                    }
                },
                allowNull: false
            },
            due_date: {
                type: DataTypes.DATE,
                validate: {
                    notNull: {
                        msg: 'Please enter the due_date'
                    }
                },
                allowNull: false
            },
            UserId: {
                type: DataTypes.INTEGER,
                validate: {
                    notNull: {
                        msg: 'Please enter the UserId'
                    }
                },
                allowNull: false
            },
            location: {
                type: DataTypes.STRING
            },
            weather: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            hooks: {
                beforeCreate: async (todo, options) => {
                    if (todo.location) {
                        try {
                            todo.weather = await getWeather(todo.location)
                        } catch (err) {
                            todo.weather = ''
                        }
                    }
                }
            }
        }
    )
    return Todo
}
