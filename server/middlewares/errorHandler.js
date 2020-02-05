module.exports = function(err, req, res, next) {
    let errObj = {
        msg : 'Internal Server Error'
    }
    let status = 500
    if (err.name === 'SequelizeValidationError') {
        errObj = { 
            msg : 'Bad Request',
            errors : []
        }
        status = 400
        err.errors.forEach(error => {
            errObj.errors.push(error.message)
        })
    } else if (err.err === 'Todo Is Not found') {
        status = 404
        errObj = {
            msg : 'Todo Is Not found'
        }
    } else if (err.msg === 'not found') {
        status = 400
        errObj = err
    } else if (err.msg === 'not authorized') {
        status = 401
        errObj = err
    }
    res.status(status).json(errObj)
}