const axios = require('axios')

module.exports = {
    getDog(req,res,next) {
        console.log(`test api =====================================`)
        axios ({
            method : 'get',
            url : 'https://dog.ceo/api/breeds/image/random'
        })
            .then(data => {
                res.status(200).json(data.data)
            })
            .catch(next)
    }
}   