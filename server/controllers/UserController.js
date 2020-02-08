const { User, Todo } = require('../models')
const { Op } = require('sequelize')
const { dehashpwd } = require('../helpers/bcryptjs')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {

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
          req.currentUserId = user.id
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
    const CLIENT_ID = process.env.CLIENT_ID
    let userObj = {}
    let id_token = req.headers.id_token
    // console.log(id_token)
    // let audience
    const client = new OAuth2Client(CLIENT_ID);
    client.verifyIdToken({
          idToken: id_token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      })
        .then(ticket => {
          const payload = ticket.getPayload();
          userObj.username = payload.name
          userObj.email = payload.email
          return User.findOne({
            where: {
              [Op.or] : [
                {username: userObj.username},
                {email: userObj.email}
              ]
            }
          })
        })
        .then(user => {
          if (user) {
            return user
          }
          else {
            userObj.password = process.env.DEFAULT_PWD
            return User.create (userObj)
          } 
        })
        .then(user => {
          let token = generateToken({id: user.id}) 
          res.status(201).json(
            {
              username: user.username,
              token 
            })
        })
        .catch(next)
  }

  static register(req, res, next) {
    let { username, email, password } = req.body
    User.create ({username, email, password})
      .then(newUser => res.status(201).json({newUser, msg:"Register success"}))
      .catch(next)
  }

}

module.exports = UserController