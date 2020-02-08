
module.exports = (err,req,res,next) => {
    console.log(err)
    let status  = 500
    let msgObj = {
        msg : 'internal errors'
    }
    if(err.name === 'SequelizeValidationError'){
        status = 400
        err.errors.forEach(el => {
            msgObj.msg = el.message
        })
    }
    else if (err.name === 'JsonWebTokenError'){
        status = 400
        msgObj = {
            msg : err
        }
    }
    else if (err.name === 'TOKEN_NOT_FUND'){
        status = 400
        msgObj = {
            msg : err
        }
    }
    else if (err.name === 'DATANOTFOUND'){
        status = 404
        msgObj.msg = err.errors.message
    }
    res.status(status).json(msgObj)
}