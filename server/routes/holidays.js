const router = require('express').Router();
const Controller = require('../controllers/holidays')

router.post('/', Controller.getHolidays)

module.exports = router