module.exports = (err, req, res, next) => {
  console.log(err)
  let status = 500
  let message = 'Internal Server Error'
  let errors 
  if (err.name === 'SequelizeValidationError'){
    status = 400
    message = 'Validation Error'
    errors = []
    for(let key in err.errors) {
      errors.push(err.errors[key].message)
    }
    res.status(status).json({
      msg: message,
      errors
    })
  } else if(err.name === 'Find Error'){
    res.status(err.status).json({
      msg: err.msg,
      proccess: err.proccess
    })
  } else if( err.name === 'Login Error'){
    res.status(err.status).json({
      msg: err.msg
    })
  } else if (err.name === 'JsonWebTokenError'){
    res.status(401).json({
      msg: 'You must Login First'
    })
  } else if (err.name === 'SequelizeUniqueConstraintError'){
    res.status(400).json({
        msg: err.errors[0].message
      })
  } else {
    res.status(status).json({
      msg: err
    })
  }
}