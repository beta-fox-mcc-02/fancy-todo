const {User} = require('../models');
const {createToken} = require('../helpers/jwt')

class GoogleSignInController{

  static signIn(req, res, next){
    let payload
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: req.headers.access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload();
        // find if user exist
        return User.findOne({
          where: {email: payload.email}
        })
      })
      .then(user => {
        if(!user){
          const newUser = {
            email: payload.email,
            password: process.env.SECRET_PASSWORD
          }
          return User.create(newUser);
        }else{
          return user
        }
      })
      .then(user=> {
        const payload = {id: user.id}
        const access_token = createToken(payload)
        res.status(201).json({access_token});
      })
      .catch(err => {
        console.log(err);
      })

  }

}

module.exports = GoogleSignInController;