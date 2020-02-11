module.exports = (err, req, res, next) => {
    let status = 500
    let errObj = {
        msg: 'Internal server error'
    }
    
    // error validation
    if (err.name === 'SequelizeValidationError') {
        errObj = {
            msg: 'Bad Request',
            errors: []
        }
        status = 400
        err.errors.forEach(error => {
            errObj.errors.push(error.message)
        });
    }

    // error not found
    if (err === 'not found') {
        errObj = {
            msg: 'not found'
        }
        status = 404
    }

    // error authentication
    if (err.name === 'JsonWebTokenError') {
        errObj = {
            msg: 'you have to login first'
        }
        status = 401
    }

    
    res.status(status).json({errObj})
}