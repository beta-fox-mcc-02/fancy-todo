const { User } = require('../models')
const bcrypt = require('../helpers/bycript')
const jwt = require('../helpers/jwt')

class UserController {
  static register (req, res, next){
    const { email, password } = req.body
    User.create({
      email,
      password
    })
      .then(user=> {
        res.status(201).json({
          id : user.id,
          email : user.email,
          msg : "succesfully register"
        })
      })
      .catch(err => next(err))
  }

  static login (req, res, next){
    const { email, password } = req.body
    User.findOne({
      where : {
        email
      }
    })
      .then(user => {
        if(user){
          let isUser = bcrypt.comparePassword(password,user.password)
          if(isUser){
            let payload = {
              id : user.id,
              email : user.email
            }
            let accesToken = jwt.generateToken(payload)
            res.status(200).json({
              accesToken
            })
          } else {
            next({
              status : 400,
              message : "Invalid Email/Password" 
            })
          }
        } else {
          next({
            status : 400,
            message : "Invalid Email/Password" 
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static gLogin(req,res,next){
    let newEmail =''
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let token = req.headers.token
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
      .then(result=>{
        let payload = result.getPayload()
        newEmail = payload.email
        User.findOne({
          where : {
            email: newEmail
          }
        })
          .then(user => {
            if(!user){
              let payload = {
                email : newEmail,
                password : process.env.SECRET_PASSWORD
              }
              return User.create(payload)
            } else {
              return user
            }
          })
          .then(user=>{
            let payload = {
              id : user.id,
              email : user.email
            }
            let accesToken = jwt.generateToken(payload)
            res.status(200).json({
              accesToken
            })
          })
      })
      .catch(err=>{
        console.log(err)
      })
  }
}

module.exports = UserController