errorHandler = (err, req, res, next) => {
    const error = err
    if(error.name === 'sequelizeDatabaseError') {
        res.status(500).json({
            msg : 'something wrong with server or database'
        })
    }
    else if(error.name === 'SequelizeValidationError') {
        const messages = []
        error.errors.forEach(err => {
            messages.push(err.message)
        });
        res.status(400).json({
            msg : messages
        })
    }
    else if(error.name === 'badInput'){
        res.status(400).json({
            msg : err.message
        })
    }
    else if(error.name === 'JsonWebTokenError'){
        res.status(400).json({
            msg : err.message
        })
    }
    else{
        res.status(404).json({
            msg : 'Data not Found'
        })
    }
}

module.exports = errorHandler