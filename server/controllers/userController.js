const { User } = require('../models')
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATEKEY
const BcryptPassword = require('../helper/encryptPassword.js')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register (req, res, next) {
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then((data) => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let token = jwt.sign(payload, privateKey)
                let username = data.email.split('@')
                let name = username[0]
                res.status(201).json({
                    token,
                    id: data.id,
                    name
                })
            })
            .catch((err) => { next(err) })
    }

    static logIn (req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((data) => {
                if(data) {
                    let passwordValidation = BcryptPassword.compare(req.body.password, data.password)
                    if (passwordValidation) {
                        let payload = {
                            id: data.id,
                            email: data.email
                        }
                        let token = jwt.sign(payload, privateKey)
                        let username = data.email.split('@')
                        let name = username[0]
                        res.status(200).json({
                            id: data.id,
                            name,
                            token
                        })
                    }
                    else next({ err: `EMAIL/PASSWORD Invalid` })
                }
                else {
                    next({ err: `USER NOT FOUND` })
                }
            })
            .catch((err) => { 
                next(err) })
    }

    static gSignIn (req, res, next) {
        let payload = '' 
        client.verifyIdToken({
            idToken: req.headers.id_token,
            audience: process.env.CLIENT_ID
        })
            .then((result) => {
                payload = result.payload
                return User.findOne({
                    where: {
                        email: payload.email
                    }
                })
            })
            .then((data) => {
                if (!data) {
                    return User.create({
                        email: payload.email,
                        password: process.env.GOOGLE_PASS
                    })
                }
                else return data
            })
            .then((data) => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let token = jwt.sign(payload, privateKey)
                let username = data.email.split('@')
                let name = username[0]
                res.status(200).json({
                    token,
                    id: data.id,
                    name
                })
            })
            .catch((err) => { next(err) })
    }
}

module.exports = UserController