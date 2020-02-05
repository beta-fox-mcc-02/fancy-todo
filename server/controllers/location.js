const axios = require('axios')

class LocationController {

  static getLocations(req, res, next) {
    const input = req.query.search
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.API_KEY}&input=${input}`,
      responseType: 'json'
    })
      .then((locations) => {
        res.status(200).json({
          data: locations.data
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = LocationController