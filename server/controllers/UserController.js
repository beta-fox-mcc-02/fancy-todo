const { User } = require('../models')
const { decryptPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
   static createUser(req, res, next) {
      console.log('masuk create')
      let { email, password } = req.body
      let input = { email, password }
      User.create(input, {
         returning : true
      })
         .then(user => {
            console.log('then create')
            res.status(201).json({
               data : user,
               msg: "register success"
            })
         })
         .catch(next)
   }

   static login(req, res, next) { 
      let { email, password } = req.body
      let payload = { email, password }
      User.findOne({
         where : {
            email : payload.email
         }
      })
         .then(user => {
            if(user) {
               const isValid = decryptPassword(payload.password, user.password)
               if(isValid) {
                  const token = generateToken({ id: user.id, email : payload.email})
                  // console.log(token)
                  res.status(200).json({
                     msg: "success login",
                     token
                  })
               } else {
                  next({
                     status : 401,
                     msg : "Wrong username/password"
                  })
               }   
            } else {
               next({
                  status : 400,
                  msg : "You must register first"
               })
            }
         })
         .catch(err => {
            next(err)
         })
   }
}



module.exports = UserController