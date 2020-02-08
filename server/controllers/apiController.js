const axios = require('axios')
const api = process.env.API

class ApiController {
    static getNews(req, res, next) {
        console.log(api)
        axios({
            method: 'get',
            url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`,
            // responseType: 'json'
        })
            .then(news => {
                res.status(200).json({
                    data: news.data
                })
            })
            .catch(err => {
                res.status(404).json({
                    msg: err
                })
            })
    }
}

module.exports = ApiController