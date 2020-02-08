const axios = require('axios')

class Controller {
    static findHolidayIdn(req, res, next) {
        axios({
            method: 'get',
            url: 'https://calendarific.com/api/v2/holidays?api_key=f55c06eeac586dffb59e833f89d103316113246d&country=id&year=2019'
        })
            .then(holidays => {
                console.log(holidays)
                res.status(200).json({
                    message: 'successfully get holiday from calendarrific api',
                    data: holidays.data.response.holidays
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller