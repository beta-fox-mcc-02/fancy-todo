const express = require('express')
const router = express.Router()
const todoRoutes = require('./todos')
const userRoutes = require('./users')
const ThirdPartyApi = require('../controllers/thirdPartyApiController')

router.use('/todos', todoRoutes)
router.use('/users', userRoutes)
router.get('/holidays', ThirdPartyApi.findHolidayIdn)

module.exports = router