const {User} = require('../models/index');
const bcrypt = require('../helpers/bcrypt');
const jwtoken = require('../helpers/jwtoken');
const {OAuth2Client} = require('google-auth-library');

class Controller {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.create(newUser)
            .then(data => {
                let payload = {}
                payload.id = data.id;
                payload.email = data.email;

                res.status(201).json({
                    payload,
                    message: "Register success"
                })
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then( data => {
                if(data) {
                    const passwordCheck = bcrypt.compareSync(req.body.password, data.password);
                    
                    if(passwordCheck) {
                        let payload = {}
                        payload.id = data.id;
                        payload.email = data.email;
                        payload.password = data.password;
                        // console.log(payload)
                        const token = jwtoken.generateToken(payload);
                    //    console.log(token)
                        res.status(200).json(token)
                    } else {
                        const error = {
                            status: 400,
                            name: 'Login Error',
                            message: 'Email or password is incorrect'
                        }
                        next(error);    
                    }

                } else {
                    const error = {
                        status: 400,
                        name: 'Login Error',
                        message: 'Email or password is incorrect'
                    }
                    next(error);
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static googleSignIn(req, res, next){
        let payload
        const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
        client.verifyIdToken({
          idToken: req.headers.access_token,
          audience: process.env.CLIENT_ID_GOOGLE
        })
          .then(ticket => {
            payload = ticket.getPayload();

            return User.findOne({
              where: {email: payload.email}
            })
          })
          .then(user => {
            if(!user){
              const newUser = {
                email: payload.email,
                password: process.env.PASSWORD
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
            next(err);
          })
    
      }

    
}

module.exports = Controller;