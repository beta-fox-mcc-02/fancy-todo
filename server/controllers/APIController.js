const axios = require('axios')

class APIController {
    static getList (req, res, next) {
        axios({
            method: 'GET',
            url: 'https://api.jikan.moe/v3/season/2011/spring',
            responseType: 'json'
          })
            .then(animeList => {
                res.status(200).json({
                    data: animeList.data
                })
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = APIController