const router = require('express').Router()
const MetaWeather = require('../controllers/metaW3rdAPIController.js')

router.get('/', MetaWeather.getCities)

module.exports = router