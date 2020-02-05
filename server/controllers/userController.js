const {User} = require('../models')
const {Todo} = require('../models')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {

  static register (req, res, next){
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(next)
  }

  static login(req, res, next){
    let umail = req.body.email
    User.findOne({
      where:{
        email: umail
      }
    })
    .then(data =>{
      // res.status(200).json(data.password)
      
      let compare = bcrypt.compareSync(req.body.password, data.password); 
      if (compare){
        // console.log(data, '=====+++++++======, masuk compare');
        let token = jwt.sign(data.id, process.env.SECRET);
        let name = data.name
        // console.log(token, 'ini tokennyaaaaaa', name);
        res.status(200).json({token, name})
      }else if (data == null){
       
      }

    })
    .catch(next)
  }

  static getOne (req, res, next){
    let pk = req.params.id
    User.findOne({
      where:{
        id: pk
      },
      include: 'Todo'
    })
    .then(data =>{
      console.log(data);
      
      res.status(200).json(data)
    })
    .catch(next)
  }

  static gSignIn(req, res, next){
    let payload

    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
    })
    .then(ticket =>{
      payload = ticket.getPayload()
      // console.log(payload,'isi payload')
      return User.findOne({ 
        where:{
          email: payload.email
        }
       })
    })
    .then(userData => {
      // console.log(userData, 'ada disini');
      
      if (!userData) {
          return User.create({
              name: payload.given_name,
              email: payload.email,
              password: process.env.PWD
          })
      }
      else {
          return userData
      }
  })
  .then(user => {

      const token = jwt.sign({ id: user.id }, process.env.SECRET)
      const name = payload.given_name;
      res.status(200).json({ token, name })
  })
    .catch(next)
  }

}

module.exports= userController