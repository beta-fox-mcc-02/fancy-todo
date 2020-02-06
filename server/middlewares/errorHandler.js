module.exports = (err, req, res, next) => {
    let code = 500
    let errObj = {
        msg: 'Internal Server Error'
    }

    console.log(err, '----------------------')

    if(err.name === 'SequelizeValidationError') {
        code = 400
        errObj = {
            msg: 'Bad Request',
            errors: []
        }
        err.errors.forEach(error => {
            errObj.errors.push(error.message)
        });
    }
    else if(err.name === 'JsonWebTokenError') {
        code = 401
        errObj.msg = 'Invalid Token'
    }
    else if(err.name === 'AuthorizationError') {
        code = err.code
        errObj.msg = err.msg
    }
    else if(err.name === 'DecodedError') {
        code = err.code
        errObj.msg = err.msg
    }
    else if(err.name === 'SequelizeUniqueConstraintError') {
        code = 400
        errObj.msg = 'Email already exists'
    }
    
    res.status(code).json(errObj)
}
  