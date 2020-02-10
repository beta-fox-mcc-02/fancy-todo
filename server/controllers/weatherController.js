const axios = require('axios')

class WeatherController {

  static city (req, res, next) {
    axios({
      method: 'GET',
      url : `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&APPID=260851c5cc4544ceec2c9ccc7487e45b`
    })
    .then( ({ data }) => {
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = WeatherController