module.exports = function(err, req, res, next){
   let status = 500
   let error = {
     message: 'internal server error',
     errors: []
   }
    // console.log(err.message);
    
   if(err.message == 'SequelizeValidationError'){

    for(let key in err.errors) {
      error.errors.push(err.errors[key].message)
    }
    status = 400
   }  

   console.log(error);
   
   res.status(status).send(err.message)
}