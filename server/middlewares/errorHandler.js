const errorHandler = (err, req, res, next) => {
  let status = 500
  let errorObj = {
    message: 'Invalid Request',
    errors: []
  }
  if (err.name === 'SequelizeValidationError') {
    status = 400
    errorObj.message = 'Bad Request'
    for (const er of err.errors) {
      errorObj.errors.push(er.message)
    }
    res.status(status).json({
      message: errorObj.message,
      errors: errorObj.errors
    })
  } else if (err.name === 'NOT FOUND') {
    status = 404
    res.status(status).json({
      message: 'Not Found',
      error: err.message
    })
  } else if (err.name === 'SequelizeDatabaseError') {
    res.status(status).json({
      message: 'Database Error',
      error: 'Error input in database'
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Please login first'
    })
  } else if (err.type === 'entity.parse.failed') {
    res.status(status).json({
      message: 'Internal Server Error',
      error: err.type
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    res.status(status).json({
      message: err.errors
    })
  } else {
    res.status(err.status || 400).json({
      message: err.message || 'Internal Server Error'
    })
  }
}

module.exports = errorHandler