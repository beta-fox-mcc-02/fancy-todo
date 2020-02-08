module.exports = (err, req, res, next) => {
    // res.status(500).json(err)
    let errObj = {
        message: []
    }
    switch(err.name) {
        case "NOT FOUND":
            status = 404
            break
        case "SequelizeValidationError":
            status = 400
            errObj.message.push(`Bad Request`)
            break
        case "JsonWebTokenError":
            status = 401
            break
        default:
            status = err.status || 500
            if (status === 500) errObj.message.push(`Internal Server Error`)
            break
    }
    if (Array.isArray(err.errors)) {
        err.errors.forEach(error => {
            errObj.message.push(error.message)
        });
    }
    res.status(status).json(errObj)
}