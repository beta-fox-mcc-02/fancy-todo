const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')

// GOOGLE
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const SECRET_PASSWORD = process.env.SECRET_PASSWORD
const client = new OAuth2Client(CLIENT_ID)

// JWT
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET

class UserController {
  static register (req, res, next) {
    let data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(data)
      .then(user => {
        let data = {}
        data.id = user.id
        data.username = user.username
        data.email = user.email
        res.status(200).json({
          data,
          msg: 'User Register Success'
        })
      })
      .catch(next)
  }

  static login (req, res, next) {
    const { email, password } = req.body
    User
      .findOne({
        where: {
          email: email
        }
      })
      .then(user => {
        if(user){
          const isValid = comparePassword(password, user.password)
          if(isValid){
            let payload = {
              id: user.id,
              email: user.email,
              username: user.username
            }
            const token = jwt.sign(payload, SECRET)
            res.status(200).json({
              token,
              name: payload.username
            })
          } else {
            next({
              name: 'Login Error',
              status: 400,
              msg: 'Wrong Email/Password !'
            })  
          }
        } else {
          next({
            name: 'Login Error',
            status: 400,
            msg: 'Wrong Email/Password !'
          })
        }
      })
      .catch(next)
  }

  static glogin (req, res, next) {
    let data = ''
    const idToken = req.headers.token
    client
      .verifyIdToken({
        idToken,
        audience: CLIENT_ID
      })
      .then( ({ payload }) => {
        data = payload
        return User
          .findOne({
            where: {
              email: data.email
            }
          })
      })
      .then( user => {
        if(user){
          return user
        } else {
          return User
            .create({
              username: data.name,
              email: data.email,
              password: SECRET_PASSWORD
            })
        }
      })
      .then( user => {
        let payload = {
          id: user.id,
          email: user.email,
          username: user.username
        }
        const token = jwt.sign(payload, SECRET)
        res.status(200).json({
          name: payload.username,
          token
        })
      })
      .catch(next)
  }
}

module.exports = UserController