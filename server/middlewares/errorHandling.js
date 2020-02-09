
module.exports = (err, req, res, next) => {
    console.log(err)
    let errorObj = {
        status : 500,
        error : 'Internal Server Error'
    }
    // let status = 500
    if(err.name === 'SequelizeValidationError'){
        if(err.errors[0].message === 'Column tidak boleh kosong'){
            // status = 400
            errorObj = {
                status : 400,
                error : 'Validation Error'
            }
            res.status(errorObj.status).json(errorObj)
        }
    } else if(err.name === 'Data Not Found'){
        errorObj = {
            status : 404,
            error : err.error
        }
        res.status(errorObj.status).json(errorObj)
    } else {
        res.status(errorObj.status).json(errorObj)
    }
}