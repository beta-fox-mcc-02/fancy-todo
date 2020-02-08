const errorHandler = (err, req, res, next) => {
    let status = err.status ? err.status : 500;
    let obj = {
        message: err.message ? err.message : 'Internal server error',
        error: err.type ? err.type : []
    }
    if (err.name === 'SequelizeValidationError') {
        status = 400;
        obj.message = 'Bad request';
        err.errors.forEach(el => {
            obj.error.push(el.message)
        });
    } else if (err.name === 'SequelizeDatabaseError') {
        status = 400;
        obj.message = 'Bad request';
        obj.error.push('Invalid input')
    }
    res.status(status).json({
        message: obj.message,
        error: obj.error
    })
}

module.exports = errorHandler;