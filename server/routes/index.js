const router = require('express').Router()
const TodoRouter = require('./todo')
const UserRouter = require('./user')
const WeatherRouter = require('./weather')

router.use('/todos', TodoRouter)
router.use('/users', UserRouter)
router.use('/weathers', WeatherRouter)

module.exports = router