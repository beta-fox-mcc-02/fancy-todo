const express = require('express')
const router = express.Router()
const Todo = require('./todos')
const User = require('./User')
const dogs = require('../Controller/AxiosController')

router.use(User)
router.get('/random_dogs',dogs.getDog)
router.use('/todos',Todo)


module.exports = router
