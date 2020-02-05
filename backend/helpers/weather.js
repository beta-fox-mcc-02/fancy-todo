const axios = require('axios')

const weather = axios.create({
    baseURL: 'http://api.weatherstack.com/'
})

const getWeather = location => {
    return new Promise((resolve, reject) => {
        weather
            .get('/current', {
                params: {
                    access_key: process.env.WEATHERSTACK,
                    query: location
                }
            })
            .then(response => {
                console.log(response.data.current.weather_descriptions[0])
                const weatherInfo =
                    response.data.current.weather_descriptions[0]

                resolve(weatherInfo)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = {
    getWeather
}
