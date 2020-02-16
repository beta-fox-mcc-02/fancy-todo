function errorHandler (err, req, res, next) {
   console.log(err)
   if(err.name === 'SequelizeValidationError') {
      let status = 400
      if(err.errors[0].message) {
         res.status(status).json({msg : err.errors[0].message})
      } else {
         res.status(status).json({
            msg : 'Bad Request'
         })
      }
   } else if(err.name === 'JsonWebTokenError') {
      let status = 401
      let msg = 'You must login first'
      res.status(status).json({
         msg
      })
   } else {
      res.status(err.status || 500).json({message : err.msg || 'Internal server error' })
   }
}

module.exports = errorHandler