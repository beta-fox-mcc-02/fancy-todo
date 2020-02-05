const router = require('express').Router();
const Controller = require('../controllers/holidays')

router.get('/', Controller.getHolidays)
router.get('/:month', Controller.getHolidays)

module.exports = router