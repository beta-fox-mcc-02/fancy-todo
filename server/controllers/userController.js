const { User } = require('../models');
const {generateToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


class UserController {
    static register(req, res, next) {
        let {name, email, password} = req.body
        User.create({
            name: name,
            email: email,
            password: password
        })
            .then(user => {
                res.status(201).json({
                    data: {
                        id: user.id,
                        name: user.name,
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
                        })
                        res.status(200).json({
                            data: {
                                id: user.id,
                                name: user.name,
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

    static gLogin(req, res, next) {
        let payload;
        client.verifyIdToken({
            idToken: req.headers.id_token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    return User.create({
                        name: payload.name,
                        email: payload.email,
                        password: process.env.GPWD
                    })
                }
            })
            .then(user => {
                let result = {
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(result)
                res.status(200).json({
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token: token
                    },
                    message: "Login success"
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController;