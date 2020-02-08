const express = require('express')
const router = express.Router()
const TodoController = require('../Controller/TodoController')
const auth = require('../middleware/authanthic')
const autho = require('../middleware/authoristation')
router.use(auth)
router.get('/',TodoController.findall)
router.post('/',TodoController.addColumn)
router.get('/:id',autho,TodoController.findone)
router.put('/:id',autho,TodoController.update)
router.delete('/:id',autho,TodoController.delete)

module.exports = router
