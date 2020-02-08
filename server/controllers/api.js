const axios = require('axios')

class ApiController {
    static getPublicHoliday(req, res, next) {
        axios({
            method : "GET",
            url : `https://date.nager.at/api/v2/publicholidays/2020/ID`,
            responseType : 'json'
        })
        .then(function(publicHolidays) {
            res.status(200).json({data : publicHolidays.data})
        })
        .catch(next)
    }
}

module.exports = ApiController