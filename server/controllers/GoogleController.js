const { User } = require('../models')

class GoogleController {
   static signIn(req, res, next) {
      // console.log(req.headers, '=========')
      const token = req.headers.token
      const CLIENT_ID = process.env.CLIENT_ID
      const client = new OAuth2Client(CLIENT_ID)
      let email
      client.verifyIdToken({
         idToken: token,
         audience: CLIENT_ID
      })
         .then(response => {
            next()
         })
         .catch(err => {
            console.log(err, '==============')
            next(err)
         })

   }
}

module.exports = GoogleController