const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register (req, res, next) {
        const { email, password } = req.body
        User.create({ email, password })
            .then(createdUser => {
                res.status(200).json({
                    data: createdUser,
                    msg: 'Register Success!'
                })
            })
            .catch(next)
    }

    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({ where: { email } })
            .then(found => {
                if(!found) {
                    res.status(400).json('Incorrect email')
                }
                else {
                    const payload = {
                        id: found.id,
                        email: found.email
                    }
                    let matched = comparePassword(password, found.password)
                    if(matched) {
                        const token = generateToken(payload)
                        res.status(200).json({
                            payload,
                            token
                        })
                    }
                    else {
                        res.status(400).json('Incorrect password')
                    }
                }
            })
            .catch(next)
    }

    static googleSignIn(req, res, next) {
        let payload
        
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({email: payload.email})
            })
            .then(userData => {
                if(!userData) {
                    return User.create({
                        email: payload.email
                    })
                }
                else {
                    return userData
                }
            })
            .then(user => {
                const token = jwt.sign({ payload }, process.env.SECRET)
                res.status(200).json({payload, token})
            })
            .catch(next)
    }
}

module.exports = UserController