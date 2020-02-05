const { User } = require('../models');
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let {email, password} = req.body
        User.create({
            email: email,
            password: password
        })
            .then(user => {
                res.status(201).json({
                    data: {
                        id: user.id,
                        email: user.email
                    },
                    message: 'Register success'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if(user) {
                    let checkPassword = comparePassword(req.body.password, user.password)
                    if(checkPassword) {
                        let token = generateToken({
                            id: user.id,
                            email: user.email,
                            password: user.password
                        })
                        res.status(200).json({
                            data: {
                                id: user.id,
                                email: user.email,
                                token: token
                            },
                            message: "Login success"
                        })
                    } else {
                        next({
                            name: "InvalidUser",
                            errors: `email / password incorrect`
                        })
                    }
                } else {
                    next({
                        name: "InvalidUser",
                        errors: `email / password incorrect`
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;