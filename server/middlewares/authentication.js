const { checkToken } = require('../helpers/jwt')
const { User } = require('../models')

function isTokenValid (req, res, next) {
   console.log('authentication')
   let token = req.headers.token
   if(token) {
      try {
         let payload = checkToken(token)
         User.findOne({
            where : {
               id : payload.id
            }
         })
            .then(user => {
               if(user) {
                  req.decoded = +user.id
                  next()
               } else {
                  next({
                     status : 401,
                     msg :'register first'
                  })
               }
            })
            .catch(err => {
               next(err)
            })
      }
      catch (err){
         next(err)
      }
   } else {
      next('You must log in first')
   }
}    


module.exports = isTokenValid