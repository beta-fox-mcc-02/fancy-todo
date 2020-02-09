"use strict"
const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static signUp(req, res, next){
        console.log(`masuk`)
        let {email, password} = req.body
        let input = {email, password}
        User.create(input)
            .then(user => {
                console.log(user)
                res.status(201).json({
                    id : user.id,
                    email : user.email
                })
            })
            .catch(next)
    }

    static signIn(req, res, next){
        let {email, password} = req.body
        let input = {email, password}
        User.findOne({
            where: {
                email : input.email
            }
        })
            .then(user => {
                if(user !== null) {
                    let isValid = comparePassword(input.password, user.password)
                    if(isValid === true) {
                        let data = {
                            id : user.id,
                            email : user.email,
                        }
                        let token = generateToken(data)
                        res.status(201).json({
                            data : data, 
                            token : token
                        })
                    } else {
                        next({
                            name : 'Data Not Found',
                            error : 'Data Not Found'
                        })
                    }
                }
            })
            .catch(next)
    }

    static googleSignIn(req, res, next){
        const CLIENT_ID = process.env.CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID)
        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                const { email } = payload
                console.log(email)
                User
                    .findOne({where:{email : email}})
                    .then(user => {
                        res.status(201).json({
                            data : user
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = UserController