const express = require('express')
const router = express.Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

router.use('/todos', todoRouter)
router.use('/', userRouter)

module.exports = router