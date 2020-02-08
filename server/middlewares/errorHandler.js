module.exports = (err,req,res,next)=>{
  // console.log(err, "ini error")
  let status = 500 ;
  let errObj = {
    msg : "Internal Server Error"
  }
  if(err.name == "SequelizeValidationError"){
    status = 400
    // errObj.msg = "Bad Request"
    errObj.msg = err.errors.map(el=> el.message)
  } else if (err.name == "JsonWebTokenError"){
    status = 403
    errObj.msg = "You Must Login First "
  } else if(err.name == "SequelizeUniqueConstraintError"){
    status = 400
    errObj.msg = "Email Already Registered"
  } else {
    status = err.status
    errObj.msg = err.message
  }
  res.status(status).json({errObj})
} 