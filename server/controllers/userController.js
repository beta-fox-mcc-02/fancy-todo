const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/password')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static create (req, res, next) {
        const { email, password } = req.body
        User.create({email, password})
            .then(user => {
                res.status(200).json({
                    data: user,
                    msg: 'sucsess register'
                })
            })
            .catch(next)
    }

    static login (req, res, next) {
        const {email, password} = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (user === null) {
                next({
                    status: 404,
                    msg: 'email not found'
                })
            } else {
                const pass = comparePassword(password, user.password)
                if (pass) {
                    const data = generateToken({
                        email,
                        id: user.id
                    })
                    res.status(200).json({
                        token: data
                    })
                } else {
                    next({
                        status: 400,
                        msg: 'username/password wrong'
                    })
                }
            }
        })
        .catch(() => {
            next({
                status: 400,
                msg: "errors"
            })
        })
    }

    static googleLogIn (req, res, next) {
        const token = req.headers.token
        let email = "";
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then(data => {
                email = data.payload.email
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(data => {
                if(!data) {
                    return User.create({
                        email,
                        password: process.env.PASSWORD
                    })
                } else {
                    return data
                }
            })
            .then(data => {
                const token = generateToken({
                    email,
                    id: data.id
                })
                res.status(200).json({
                    token
                })
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = UserController