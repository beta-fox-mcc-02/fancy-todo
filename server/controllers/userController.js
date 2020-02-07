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
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

    static login (req, res, next) {
        const {email, password} = req.body
        // console.log(req.body);
        
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if (user === null) {
                next({
                    status: 404,
                    msg: 'username/password wrong'
                })
            } else {
                
                const pass = comparePassword(password, user.password)
                if (pass) {
                    console.log(pass, 'ini password')
                    const data = generateToken({
                        email,
                        id: user.id
                    })
                    console.log(data, 'QOOOYYY')
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
        // console.log(req.headers.token, "HEADERSSS TOKEENNNN")
        const token = req.headers.token
        // res.status(200).json()
        let email = "";
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then(data => {
                // console.log(data.payload.email, "PAYLOADD EMAIILLL")
                // res.status(200).json()
                email = data.payload.email
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then(data => {
                // console.log("masuk dari hasil cari email yang sama")
                // console.log(data, "SETELAH FIND ONE")
                // res.status(200).json()
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
                // console.log(data, "SETELAAHHH FIND ONE")
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