const express = require('express')
const router = express.Router()
const todos = require('./todoRouter')
const user = require('./userRouter')
const API = require('./APIRouter')

router.use('/todos', todos)
router.use('/', user)
router.use('/api', API)

module.exports = router
