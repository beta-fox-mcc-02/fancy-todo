const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/api')


// router.get('/book', GoogleBookController)
router.get('/publicHoliday', ApiController.getPublicHoliday)

module.exports = router