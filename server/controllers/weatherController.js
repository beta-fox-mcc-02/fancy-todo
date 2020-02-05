const axios = require ('axios')

class WeatherController {
   static getWeather(req, res, next) {
      axios({
         method : `GET`,
         url : `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&APPID=8a4aa542f752975693c631a75b9fbf51`
      })
         .then (({data}) => {            
            res.status(200).json({weather : data.weather[0].description, city: data.name})
         })
         .catch(err => {            
            // next({code: 404, message: `There's no city such as ${req.params.city}`})
            next(err)
         })
   }

}

module.exports = WeatherController