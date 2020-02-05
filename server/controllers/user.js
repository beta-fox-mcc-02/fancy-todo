const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        let payload = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(payload)
            .then(function(user) {
                let dataUser = {
                    id : user.id,
                    email : user.email,
                    password : user.password
                }
                res.status(201).json({
                    msg : "Register is successfully",
                    data : dataUser
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        let payload = {
            email : req.body.email,
            password : req.body.password
        }
        User.findOne({
            where : {
                email : payload.email
            }
        })
        .then(function(user) {
            let status = comparePassword(payload.password, user.password)
            if (status) {
                let id = {id : user.id}
                let token = generateToken(id)
                res.status(200).json({
                    msg : "Login is succesfully",
                    accesToken : token
                })
            } else {
                res.status(400).json({
                    msg : "user/password wrong"
                })
            }
        })
        .catch(function(err) {
            res.status(400).json({
                msg : "user/password wrong"
            })
        })
    }

    static googleSign(req, res, next) {
        console.log('MASUK')
        let id_token = req.body.id_token
        let userData= ''
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
            .then(function(ticket) {
                // console.log(ticket)
                userData = ticket.getPayload();
                return User.findOne({
                    where : {
                        email : userData.email
                    }
                })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    
                    return User.create({
                        email : userData.email,
                        password : process.env.DEFAULT_PASSWORD
                    })
                }
            })
            .then(function(user) {
                let token = generateToken(user.id)
                res.status(200).json({
                    accesToken : token
                })
            })
            .catch(next)
    }
}

module.exports = UserController