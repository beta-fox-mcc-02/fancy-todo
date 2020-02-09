const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const { compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = {
  register(req, res, next) {
    const { email, password } = req.body
    User.create({
      email,
      password
    })
      .then(user => {
        res
          .status(201)
          .json(user)
      })
      .catch(next)
  },

  login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(user => {
        const valid = compare(password, user.password)
        if (!valid) {
          // invalid password
          next({ msg: "Invalid Username / Password" })
        } else {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = sign(payload)
          res
            .status(200)
            .json({ token: access_token, email: user.email })
        }
      })
      .catch(err => {
        // invalid email
        next({ msg: "Invalid Username / Password" })
      })
  },

  googleSignIn(req, res, next) {
    let email

    client.verifyIdToken({
      idToken: req.body.google_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        email = ticket.getPayload().email
        return User.findOne({ where: { email } })
      })
      .then(userData => {
        if (!userData) {
          return User.create({
            email,
            password: process.env.SECRET_PASSWORD
          })
        }
        else {
          return userData
        }
      })
      .then(user => {
        const payload = {
          id: user.id,
          email: user.email
        }
        const access_token = sign(payload)
        res
          .status(200)
          .json({ token: access_token, email: user.email })
      })
      .catch(next)
  }
}