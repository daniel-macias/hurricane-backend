const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const tropicalStormController = require('../controllers/tropicalStormController')

router.get('/earthquakes', disasterController.getEarthquakes);
router.get('/hurricanes', disasterController.getHurricanes);
router.get('/tropical',tropicalStormController.getTropicalCycloneData);

module.exports = router;
