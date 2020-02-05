const router = require('express').Router();
const ThirdApiController = require('../controllers/thirdApiController');
const authentication = require('../middlewares/authentication')

router.get('/currencyExchange', ThirdApiController.currencyExchange)
router.get('/randomdogs', ThirdApiController.randomDog)
router.get('/randomIcon', authentication, ThirdApiController.randomIcon)

module.exports = router