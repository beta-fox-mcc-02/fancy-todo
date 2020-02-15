const axios = require('axios')

class LocationController {

  static getLocations(req, res, next) {
    const input = req.query.search
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      params: {
        key: process.env.API_KEY,
        input: input
      },
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

  static getLocationDetail(req, res, next) {
    const place_id = req.query.place_id
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/details/json?`,
      params: {
        key: process.env.API_KEY,
        place_id,
        fields: 'name,geometry,rating,formatted_phone_number,formatted_address'
      },
      responseType: 'json'
    })
      .then(detail => {
        res.status(200).json(detail.data)
      })
      .catch(err => next(err))
  }

  static getNearbyPlaces(req, res, next) {
    const radius = req.query.radius
    const type = req.query.type
    const location = req.query.location
    axios({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      params: {
        key: process.env.API_KEY,
        radius,
        type,
        location
      }
    })
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => next(err))
  }
}

module.exports = LocationController