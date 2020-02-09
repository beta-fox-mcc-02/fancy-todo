const axios = require('axios')

module.exports = {
    getQuotes(req, res, next){
        axios({
            method : 'get',
            url : 'https://quote-garden.herokuapp.com/quotes/random'
        })
            .then(result => {
                res.status(200).json(result.data)
            })
            .catch(next)
    }
}