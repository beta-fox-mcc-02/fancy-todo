const express = require('express')
const router = express.Router()
const ApiController = require('../controllers/api')


// router.get('/book', GoogleBookController)
router.get('/', ApiController.getPublicHoliday)

module.exports = router