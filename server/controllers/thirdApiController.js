const axios = require('axios');

class ThirdApiController {
    static randomDog(req, res, next) {
        axios({
            method: 'GET',
            url: "https://random.dog/woof.json",
            responseType: 'json'
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                next(err)
            })
    }

    static currencyExchange(req, res, next) {
        axios({
            method: 'GET',
            url: "https://api.exchangeratesapi.io/latest",
            responseType: 'json'
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                next(err)
            })
    }

    static randomIcon(req, res, nex) {
        axios({
            method: 'GET',
            url: `https://api.kwelo.com/v1/media/identicon/${req.decoded.email}`,
            responseType: 'json'
        })
            .then(response => {
                res.status(200).json(response.data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ThirdApiController;