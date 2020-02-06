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
    res.status(status).json(errorObj)
  } else if (err.name === 'NOT FOUND') {
    status = 404
    errorObj.message = 'Not Found'
    errorObj.errors.push(err.message)
    res.status(status).json(errorObj)
  } else if (err.name === 'SequelizeDatabaseError') {
    errorObj.message = 'Database Error'
    errorObj.errors.push('Error input in database')
    res.status(status).json(errorObj)
  } else if (err.name === 'JsonWebTokenError') {
    errorObj.message = 'JWT Error'
    errorObj.errors.push('Please login first')
    res.status(401).json(errorObj)
  } else if (err.type === 'entity.parse.failed') {
    errorObj.message = 'Internal Server Error'
    errorObj.errors.push(err.type)
    res.status(status).json(errorObj)
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    errorObj.message = 'Bad Request'
    for (const er of err.errors) {
      errorObj.errors.push(er.message)
    }
    res.status(status).json(errorObj)
  } else {
    console.log(err)
    errorObj.message = 'Internal Server Error'
    errorObj.errors.push(err.message || 'Internal Server Error')
    res.status(err.status || 400).json(errorObj)
  }
}

module.exports = errorHandler