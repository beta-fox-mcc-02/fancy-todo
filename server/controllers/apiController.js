const axios = require('axios')

class Controller {
    static getApi (req, res, next) {
        axios({
            method: 'get',
            url: `https://api.airvisual.com/v2/nearest_city?key=${process.env.API_KEY}`,
            responseType: 'json'
          })
          .then((cities) => {
            res.status(200).json(cities.data)
          })
          .catch((err) => {
                console.log(err)
              next(err)
          })
    }
}

module.exports = Controller