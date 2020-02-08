const { User } = require('../models')
const { comparePassword, createToken } = require('../helpers/auth')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body

        const user = {
            email,
            password
        }
        User.create(user)
            .then(result => {
                let data = {
                    id: result.id,
                    email: result.email
                }
                res.status(201).json({ data })
            })
            .catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ where: { email } })
            .then(result => {
                if (result) {
                    const isLogin = comparePassword(password, result.password)

                    if (isLogin) {
                        const payload = {
                            id: result.id,
                            email: result.email
                        }
                        const message = 'Successfully logged in.'
                        const token = createToken(payload)
                        res.status(200).json({ token, message })
                    } else {
                        next({
                            name: 'wrongauth',
                            error: 'email / password not correct'
                        })
                    }
                } else {
                    next({
                        name: 'wrongauth',
                        error: 'email / password not correct'
                    })
                }
            })
            .catch(next)
    }

    static gSignIn(req, res, next) {
        console.log(req.body.id_token)
        const { id_token } = req.body
        client
            .verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID
            })
            .then(result => {
                console.log(result.payload)
                const { email } = result.payload
                // cek dah ada pa belom, kalo udah ada
                User.findOne({ where: { email } })
                    .then(user => {
                        if (user) {
                            const isGoogleAuth = comparePassword(
                                process.env.G_PASSWORD,
                                user.password
                            )

                            if (isGoogleAuth) {
                                // generate token terus login berhasil
                                const payload = {
                                    id: user.id,
                                    email: user.email
                                }
                                const message = 'Successfully logged in.'
                                const token = createToken(payload)
                                res.status(200).json({ token, message })
                            } else {
                                res.status(400).json({
                                    message: 'Email sudah terdaftar'
                                })
                            }
                        } else {
                            // kita register disini

                            const newUser = {
                                email,
                                password: process.env.G_PASSWORD
                            }

                            User.create(newUser)
                                .then(result => {
                                    const payload = {
                                        id: result.id,
                                        email: result.email
                                    }
                                    const message = 'Successfully logged in.'
                                    const token = createToken(payload)
                                    res.status(200).json({ token, message })
                                })
                                .catch(next)
                        }
                    })
                    .catch(next)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = UserController
