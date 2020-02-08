const router = require('express').Router()
const thirdPartyApi = require('../controllers/TodoController')

router.get('/', thirdPartyApi.search)

module.exports = router