module.exports = (err, req, res, next) => {
  let errCode = 500
  let problems = {
    msg: "Internal server error",
    errors: []
  }
  console.log(err)

  if(err.name === "SequelizeValidationError") {
    errCode = 400
    problems.msg = "Bad request"
    err.errors.forEach(error => {
      problems.errors.push(error.message)
    });
  }

  if(err.name === "SequelizeUniqueConstraintError") {
    errCode = 400
    problems.msg = "Bad request"
    err.errors.forEach(error => {
      problems.errors.push(error.message)
    });
  }

  if(err.name === "AuthenticationError") {
    errCode = 401
    problems.msg = "Please login first"
    problems.errors.push("Authentication Error")
  }

  if(err.name === "AuthorizationError") {
    errCode = 401
    problems.msg = "User is not authorize"
    problems.errors.push("Authorization Error")
  }

  if(err.name === "JsonWebTokenError") {
    errCode = 401
    problems.msg = "User is not authorize"
    problems.errors.push("Authorization Error")
  }
  
  res.status(errCode).send(problems)
}