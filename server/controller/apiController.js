const axios = require('axios')

class ApiController{
  static getQuote(req,res,next){
    axios({
      method : 'post',
      url : 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en'
    })
    .then(result=>{
      res.status(201).json({
        quote : result.data.quoteText,
        author : result.data.quoteAuthor
      })
    })
    .catch(err=>{
      next(err)
    })
  }
}

module.exports = ApiController