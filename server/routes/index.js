const router = require('express').Router();
const todosRouter = require('./todos')
const userRouter = require('./user')
const holidaysRouter = require('./holidays')

router.use('/', userRouter)
router.use('/todos', todosRouter)
router.use('/holidays', holidaysRouter)

module.exports = router;