const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const { compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')

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
            .json({ token: access_token })
        }
      })
      .catch(err => {
        // invalid email
        next({ msg: "Invalid Username / Password" })
      })
  }
}