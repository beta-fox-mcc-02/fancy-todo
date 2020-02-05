const express           = require('express');
const router            = express.Router();
const TodoController    = require('../controllers/TodoController.js');
const authentication        = require('../middleware/authentication.js');
const authorization        = require('../middleware/authorization.js');

router.use(authentication);
router.get('/', TodoController.findAll);
router.post('/', TodoController.create);
router.get('/goHome', TodoController.goHome);
router.get('/:id', TodoController.findById);
router.put('/:id', TodoController.update);
router.delete('/:id', authorization, TodoController.delete);

module.exports = router;