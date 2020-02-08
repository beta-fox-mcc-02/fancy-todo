const router = require('express').Router()
const todoRouter = require('./todos')
const userRouter = require('./users')
const ApiController = require('../controller/apiController')

router.use('/', userRouter)
router.use('/todos', todoRouter)
router.use('/quote', ApiController.getQuote)

module.exports = router