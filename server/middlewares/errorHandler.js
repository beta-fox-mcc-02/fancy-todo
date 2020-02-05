module.exports = (err, req, res, next) => {
    let errObj = { err: 'Server Failed to Response' }
    let status = 500
    if (err.name == "SequelizeValidationError") {
        errObj.err = 'BAD REQUEST'
        errObj.msg = []
        for (let element of err.errors) {
            errObj.msg.push(element.message)
        }
        status = 400
    }
    else if (err.err) {
        errObj = err
        status = 400
    }
    else if (!err.length) {
        errObj = {
            err: 'ERROR NOT FOUND'
        }
        status = 404
    }
    res.status(status).json(errObj)
}