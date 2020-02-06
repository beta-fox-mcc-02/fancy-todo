function errorHandler (err, req, res, next) {
   // console.log(err)
   if(err.name === 'SequelizeValidationError') {
      let status = 400
      let msg = 'Bad request'
      res.status(status).json({
         msg
      })
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