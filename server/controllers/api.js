const axios = require('axios')

class Api{
    static news(req,res,next){
        axios({
            method: 'get',
            url: 'https://newsapi.org/v2/everything?q=bitcoin&from=2020-01-04&sortBy=publishedAt&apiKey=14675b73ba414f61acb2aadf52a2e5a8',
            responseType: 'json'
          })
            .then(news=>{
                res.status(200).json({
                    data:news.data
                })
            })
            .catch(next)
    }
}

//14675b73ba414f61acb2aadf52a2e5a8

module.exports = Api