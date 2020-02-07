const { User } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

let secretPasswordGoogle = process.env.SECRET_GOOGLE

class Controller {
    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(user => {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let token = generateToken(payload);
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    accessToken: token
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
                            email: user.email
                        }
                        let token = generateToken(payload);
                        res.status(200).json({
                            accessToken: token
                        })
                    } else {
                        next({
                            status: 400,
                            message: 'Bad request',
                            type: 'Email / Password Wrong'
                        })
                    }
                } else {
                    next({
                        status: 400,
                        message: 'Bad request',
                        type: 'Email / Password Wrong'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static loginGoogle(req, res, next) {
        let payload;
        const client = new OAuth2Client("539169343052-ck6st9oeel1c00ope1scvr4bfk6nalt1.apps.googleusercontent.com");
        client.verifyIdToken({
            idToken: req.headers.access_token,
            audience: "539169343052-ck6st9oeel1c00ope1scvr4bfk6nalt1.apps.googleusercontent.com",
        })
            .then(response => {
                payload = {
                    first_name: response.payload.given_name,
                    last_name: response.payload.family_name,
                    email: response.payload.email,
                    picture: response.payload.picture
                }
                return User.findOne({
                    where: {
                        email: response.payload.email
                    }
                })
            })
            .then(user => {
                if (user) {
                    let payload = {
                        id: user.id,
                        email: user.email,
                    }
                    let token = generateToken(payload);
                    res.status(200).json({
                        accessToken: token
                    })
                } else {
                    let newUser = {
                        email: payload.email,
                        password: secretPasswordGoogle
                    }
                    User.create(newUser)
                        .then(user => {
                            let payload = {
                                id: user.id,
                                email: user.email,
                            }
                            let token = generateToken(payload);
                            res.status(200).json({
                                accessToken: token
                            })
                        })
                        .catch(err => {
                            next(err);
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller;