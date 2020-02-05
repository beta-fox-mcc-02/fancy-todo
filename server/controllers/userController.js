const { User }        = require('../models')
const {checkPassword} = require('../helpers/hashPassword')
const jwt             = require('../helpers/jwt')

class UserController {

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