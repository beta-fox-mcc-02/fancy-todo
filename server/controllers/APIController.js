const axios = require('axios')

class APIController {
    static getList (req, res, next) {
        console.log('masuk')
        axios({
            method: 'get',
            url: `http://api.airvisual.com/v2/city?city=Jakarta&state=Jakarta&country=Indonesia&key=${process.env.AIRVISUAL_KEY}`
          })
            .then(({ data }) => {
                res.status(200).json({
                    data
                })
            })
            .catch(err => {
                res.status(500).json(err.message)
                console.log(err)
            })
    }
}

module.exports = APIController