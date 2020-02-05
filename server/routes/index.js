const router = require('express').Router()
const todoRouter = require('./todo.js')
const userRouter = require('./user.js')
const metaWeatherRouter = require('./metaWeather.js')

router.use('/todos', todoRouter)
router.use('/user', userRouter)
router.use('/weather', metaWeatherRouter)

module.exports = router