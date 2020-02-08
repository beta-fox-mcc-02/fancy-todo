const axios = require('axios')

class Api {
    static weather(req, res, next) {
        const { city } = req.params
        console.log(req.params,'kalo masuk saya solat maghrib')
        console.log(req.body,'kalo masuk saya solat isya')
        const apiKey = process.env.WEATHERKEY
        axios({
            method:'GET',
            url:`https://api.weatherbit.io/v2.0/current?&city=${city}&country=id&key=${apiKey}`,
            responseType: 'json'
        })
            .then(weather=>{
                res.status(200).json({
                   weather 
                })
            })
            .catch(err=>{
                res.status(500).json({
                    err
                })
            })
    }
}

module.exports = Api