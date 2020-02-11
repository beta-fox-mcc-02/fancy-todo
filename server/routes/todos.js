const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.createTodo);
router.get('/', TodoController.findAll);
router.get('/:id', authorization, TodoController.findOne);
router.delete('/:id', authorization, TodoController.delete);
router.put('/:id', authorization, TodoController.update);


module.exports = router;