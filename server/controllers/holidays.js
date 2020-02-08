const axios = require('axios');

class Controller {
    static getHolidays(req, res, next) {
        let api_key = process.env.API_KEY_CALENDAR
        let year = req.body.year;
        let month = req.body.month
        axios({
            method: 'get',
            url: month ? `https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=id&year=${year}&month=${month}` : `https://calendarific.com/api/v2/holidays?api_key=${api_key}&country=id&year=${year}`
        })
            .then(holidays => {
                res.status(200).json(holidays.data.response)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = Controller;