const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')

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

    static gSignIn(req, res) {
        const idToken = req.headers.id_token
        // console.log(idToken)
        
        User.verifyToken({
            idToken,
            // audience: "517803177625-n77g91t2rv39th4tuhksmj7dlvisfno6.apps.googleusercontent.com"
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = UserController