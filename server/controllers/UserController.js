const { User, Todo } = require('../models')
const { Op } = require('sequelize')
const { dehashpwd } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static findAll(req, res, next) {
    User.findAll({
      include: [{
        model: Todo,
        order: [['id']]
      }],
      order: [['id']],
      attributes: {
        exclude: ['password']
      }
    })
    .then(users => res.status(200).json(users))
    .catch(next)
  }

  static login(req, res, next) {
    let { user, password } = req.body 
    let err = {}
    User.findOne({ 
      where: {
        [Op.or] : [
          {username: user},
          {email: user}
        ]
      },
      include: [{
        model: Todo,
        order: [['id']]
      }]
    })
    .then(user => {
      if(!user) {
        err.name = "username/email/password wrong"
        next(err)
      }
      else {
        if (!dehashpwd(password, user.password)) {
          err.name = "username/email/password wrong"
          next(err)
        }
        else {
          let userObj = {
            id: user.id,
          }
          let token = generateToken(userObj)
          res.status(200).json(
            {
              username: user.username,
              token
            })
        }
      }
    })
    .catch(next)
  }

  //google sign in
  static gsignin(req, res, next) {
    let token = req.body.token
    // let audience
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      // If request specified a G Suite domain:
      //const domain = payload['hd'];
    }
verify().catch(console.error);
  }

  static register(req, res, next) {
    let { username, email, password } = req.body
    User.create ({username, email, password})
      .then(newUser => res.status(200).json({newUser, msg:"login success"}))
      .catch(next)
  }

}

module.exports = UserController