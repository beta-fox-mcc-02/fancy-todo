const { User } = require('../models')
const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  const token = req.headers.access_token
  if (token) {
    try {
      const auth = verify(token)
      if (auth) {
        User.findOne({ where: { id: auth.id } })
          .then(user => {
            if (user) {
              req.currentUserId = auth.id
              next()
            } else {
              next({ msg: 'User has been banned' })
            }
          })
      }
    }
    catch (err) {
      res
        .status(500)
        .json({ msg: err.message })
    }
  } else {
    next({ status: 403 })
  }
}