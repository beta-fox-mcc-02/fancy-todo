const router = require('express').Router()
const { LocationController } = require('../controllers')

router.get('/', LocationController.getLocations)
router.get('/detail', LocationController.getLocationDetail)
router.get('/nearby', LocationController.getNearbyPlaces)
module.exports = router