const router = require('express').Router()
const Weather = require('../controllers/weatherController')

router.get('/:city', Weather.city)

module.exports = router