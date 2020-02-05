module.exports = function(err, req, res, next){

  // if there is sequelize validation error
  if(err.name === "SequelizeValidationError"){
    err.status = 400;
    err.message = err.errors.map(el => el.message);
  }

  // if token error
  if(err.name === 'JsonWebTokenError'){
    err.status = 401;
    err.message = 'You must login first'
  }

  // if same email
  if(err.name === 'SequelizeUniqueConstraintError'){
    err.status = 400;
    err.message = 'Email already exists'
  }

  res.status(err.status || 500).json({message: err.message || 'Internal Server Error'});
}
