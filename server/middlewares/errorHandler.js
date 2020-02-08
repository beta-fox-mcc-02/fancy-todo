module.exports = (err, req, res, next) => {
    let status = 500
    let message = err || 'internal server error'
    if (err.name == 'SequelizeValidationError') {
        err.errors.forEach(el => {
            status = 400
            message = el.message
        })
    }else if(err.name == 'notfound'){
        status = 404
        message = `error, data ${err.id} not found`
    }
    res.status(status).json({
        message
    })
}