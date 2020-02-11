module.exports = {
    errorHandler: (err, req, res, next) => {
        let status = 500;
        let errObj = {
            error: "Internal Server Error"
        }
        if(err.name === "SequelizeValidationError") {
            status = 400
            errObj.error = "Bad Request"
            errObj.msg = err.errors[0].message;
        } else if(err.name === "InvalidUser") {
            status = 400
            errObj.error = "Bad Request"
            errObj.msg = err.errors;
        } else if(err.name === "AuthenticationRequired") {
            status = 401
            errObj.error = "Unauthorized"
            errObj.msg = err.errors;
        } else if(err.name === "DataNotFound") {
            status = 404
            errObj.error = "Not Found"
            errObj.msg = err.errors;
        }
        res.status(status).json(errObj);
    }
}