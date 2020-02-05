const errorHandler = (err, req, res, next) => {
    let errObj = {
        name: 'Internal Server Error',
        statusCode: 500
    }

    if (err.name === 'SequelizeValidationError') {
        errObj = {
            name: err.name,
            statusCode: 400,
            errors: []
        }
        err.errors.forEach(error => {
            errObj.errors.push(error.message)
        })
        res.status(errObj.statusCode).json(errObj)
    } else if (err.name === 'DataNotFound') {
        errObj = {
            name: err.name,
            statusCode: 404,
            errors: ['404 Not Found']
        }
        res.status(errObj.statusCode).json(errObj)
    } else if (err.name === 'wrongauth') {
        errObj = {
            name: err.name,
            statusCode: 400,
            error: err.error
        }
        res.status(errObj.statusCode).json(errObj)
    } else if ((err.name = 'unauthorized')) {
        errObj = {
            name: err.name,
            statusCode: 401,
            error: err.error
        }
        res.status(errObj.statusCode).json(errObj)
    } else {
        res.status(errObj.statusCode).json(errObj)
    }
}

module.exports = errorHandler
