const express = require('express')
const router = express.Router()
const todos = require('./todoRouter')
const user = require('./userRouter')
const APIController = require('../controllers/APIController')

router.use('/todos', todos)
router.use('/', user)
router.get('/airvisual', APIController.getList)

module.exports = router
