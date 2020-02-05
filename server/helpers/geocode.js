const axios = require('axios')

module.exports = {
  getLatLon(address) {
    return axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLEAPIKEY}&address=${address}`
    })
  }
}