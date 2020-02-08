const { User }        = require('../models')
const {checkPassword} = require('../helpers/hashPassword')
const jwt             = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {

      static gSign (req, res, next) {
        let access_token = req.headers.access_token
        let email = ""
        client.verifyIdToken({
          idToken: access_token,
          audience: process.env.CLIENT_ID
        })
        .then(data => {
          // console.log(data.payload.email)
          email = data.payload.email
          return User.findOne({
            where: { email }
          })
        })
        .then(data => {
          if (!data) {
            return User.create({
              email,
              password: process.env.DUMMYPASSWORD
            })
          } else {
            return data
          }
        })
        .then(data => {
          let access_token = jwt.generate({
            id: data.id,
            email: data.email
          })
          res.status(200).json({
            access_token,
            email: data.email,
            isLogin: true
          })
        })
        .catch(err => {
          console.log(err)
        })
      }

      static register(req, res, next) {
        let { email, password } = req.body

        User.findOne({where: {email}})
          .then((user) => {
            if (user) {
              let errObj = {
                status: 400,
                errors: [{
                  message: 'email already exists'
                }]
              }
              next(errObj)
            } else {
              User.create({email, password})
              .then((user) => {
                res.status(201).json(user)
              })
            }
          })
          .catch((err) => {
            err ={msg:'test'}
            res.status(500).json(err)
          })
      }

      static login(req, res, next) {
        let { email, password } = req.body
        // console.log(email,password)
        // res.send(email)
        User.findOne({where: {email}})
          .then((user) => {
            if (!user) {
              let errObj = {
                status: 400,
                errors: [{
                  message: 'email does not exists'
                }]
              }
              next(errObj)
            }
            let isCorrect = checkPassword(password, user.password)
            if (user && isCorrect) {
              let access_token = jwt.generate({
                id: user.id,
                email: user.email
              })
              res.status(200).json({
                access_token,
                email: user.email,
                isLogin: true
              })
            } else {
              let errObj = {
                status: 400,
                errors: [{
                  message: 'invalid email/password'
                }]
              }
              next(errObj)
            }
          })
          .catch((err) => {
            err= {msg: 'test error'}
            res.status(500).json(err)
          })
      }
    
}   

module.exports = UserController