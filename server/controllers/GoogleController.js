const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const { generateToken } = require('../helpers/jwt')

const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class GoogleController {
   static signIn(req, res, next) {
      const token = req.headers.token      
      let email

      client.verifyIdToken({
         idToken: token,
         audience: CLIENT_ID
      })
         .then(data => {
            email = data.payload.email
				return User.findOne({
					where: {
						email
					}
				})
         })
         .then(user => {
            if(user) {
               return user
            } else {
               return User.create({
                  email,
                  password : process.env.PASSWORD
               })
            }
         })
         .then(user => {
            const token = generateToken({id : user.id, email: user.email})
            res.status(200).json({
               msg: "login succesfully",
               token
            })
         })
         .catch(err => {
            res.status(400).json({err})
            next(err)
         })
   }
}

module.exports = GoogleController