module.exports = (err, req, res, next) => {
    // console.log(err, "INI ERROORRRRR")
    if (err.name === 'SequelizeValidationError') {
        let errHandler = {
            errors: []
        }
        const status = 400
        err.errors.forEach(val => {
            errHandler.errors.push(val.message)
        });
        console.log(errHandler, "ERROORRRR")

        res.status(status).json({
            msg: errHandler.errors
        })
    } 
    else {
        res.status(err.status || 500).json({
            msg: err.msg || 'Invalid Server Error'
        })
    }
}