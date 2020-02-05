const express           = require('express');
const router            = express.Router();
const TodoRoutes        = require('./TodoRoutes.js');
const UserRoutes        = require('./UserRoutes.js');

router.use('/todos', TodoRoutes);
router.use('/users', UserRoutes);

module.exports = router;