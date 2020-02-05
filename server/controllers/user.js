const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    password: user.password
                });
            })
            .catch(err => {
                next(err);
            })
    }
    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(user => {
                if (user) {
                    if (comparePass(req.body.password, user.password)) {
                        let payload = {
                            id: user.id,
                            email: user.email,
                        }
                        let token = generateToken(payload);
                        res.status(200).json({
                            accessToken: token
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'Bad request',
                            type: 'email / password wrong'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Bad request',
                        type: 'email / password wrong'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;