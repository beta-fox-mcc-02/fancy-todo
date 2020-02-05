module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let errHandler = {
            errors: []
        }
        const status = 400
        err.errors.forEach(err => {
            errHandler.errors.push(err.message)
        });
        res.status(status).json(errHandler)
    } 
    else {
        res.status(err.status || 500).json({
            msg: err.msg || 'Invalid Server Error'
        })
    }
}