const router = require('express').Router();
const { TodoController } = require('../controllers');
const { isAuthenticated, isAuthorizationed } = require('../middlewares')


router.use(isAuthenticated)
router.post('/', TodoController.addTodo);
router.get('/', TodoController.getTodos);
router.use('/:id', isAuthorizationed)
router.get('/:id', TodoController.getTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);


module.exports = router;
