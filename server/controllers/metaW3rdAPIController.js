const axios = require('axios')

class MetaWeather {
    static getCities(req, res, next){
        axios({
            method: 'get',
            url: `https://www.metaweather.com/api/location/search/?query=${req.query.city_name}`,
          })
            .then((response) => {
                res.status(200).json({data: response.data})
            })
            .catch((err) => { res.status(500).json({ err }) })
    }
}

module.exports = MetaWeather