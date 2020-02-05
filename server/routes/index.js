const express = require('express')
const router = express.Router()
const todos = require('./todos')
const users = require('./users')
const api = require('./api')

router.use('/todos', todos)
router.use(users)
router.use('/api', api)


module.exports = router