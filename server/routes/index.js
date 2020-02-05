const router = require('express').Router()
const todoRoutes = require('./todo')
const userRoutes = require('./user')
const locationRoutes = require('./location')

router.use('/todos', todoRoutes)
router.use('/users', userRoutes)
router.use('/locations', locationRoutes)
module.exports = router