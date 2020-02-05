const axios = require('axios')
const api = process.env.API

class ApiController {
    static getNews(req, res, next) {
        axios({
            method: 'get',
            url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${api}`,
            responseType: 'json'
        })
            .then(kurs => {
                res.status(200).json({
                    data: kurs.data
                })
            })
            .catch(err => {
                res.status(404).json({
                    msg: 'error'
                })
            })
    }
}

module.exports = ApiController