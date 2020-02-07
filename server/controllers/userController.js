const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {
    static register(req, res, next) {
        let { email, password } = req.body

        User.create({
            email: email,
            password: password
        })
            .then(response => {
                let payload = {}
                payload.id = response.id
                payload.email = response.email
                res.status(201).json({
                    payload,
                    msg: "successully register"
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (user) {
                    const pwd = comparePassword(password, user.password)
                    if (pwd) {
                        const payload = {
                            id: user.id,
                            email: user.email
                        }
                        const token = generateToken(payload)
                        res.status(200).json({
                            message: 'succesfully login',
                            token
                        })
                    } else {
                        res.status(400).json({
                            message: 'Username / password wrong'
                        })
                    }
                } else {
                    res.status(400).json({
                        message: 'Username / password wrong'
                    })
                }
            }) 
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static gSignIn(req, res, next) {
        const token = req.headers.id_token
        const CLIENT_ID = process.env.CLIENT_ID
        const SECRET_PASSWORD = process.env.SECRET_PASSWORD
        const client = new OAuth2Client(CLIENT_ID)
        let userEmail = ''
        
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
        })
            .then(response => {
                const payload = response.getPayload();
                userEmail = payload.email
                return User.findOne({
                    where: {
                        email: userEmail
                    }
                })
            })
            .then(response => {
                if (!response) {
                    return User.create({
                        email: userEmail,
                        password: SECRET_PASSWORD
                    })
                } else {
                    return response
                }
            })
            .then(response => {
                const payload = {
                    id: response.id,
                    email: response.email
                }
                const newUserToken = generateToken(payload)
                res.status(200).json({
                    msg: 'succesfully sign in',
                    token: newUserToken
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = UserController