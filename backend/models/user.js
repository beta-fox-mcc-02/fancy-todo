'use strict'

const { hashPassword } = require('../helpers/auth')

module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {
        static associate(models) {
            User.hasMany(models.Todo)
        }
    }

    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Email cannot be empty'
                    },
                    isEmail: {
                        args: true,
                        msg: 'Email format not correct'
                    },
                    isUniqueCustom(value, next) {
                        User.findOne({ where: { email: value } })
                            .then(result => {
                                if (result) {
                                    next('User already exist')
                                } else {
                                    next()
                                }
                            })
                            .catch(err => {
                                next(err)
                            })
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'Password cannot be empty'
                    }
                }
            }
        },
        {
            sequelize,
            hooks: {
                beforeCreate(user, options) {
                    user.password = hashPassword(user.password)
                }
            }
        }
    )
    return User
}
