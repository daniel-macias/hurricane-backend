const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const tropicalStormController = require('../controllers/tropicalStormController')
const tideTechController = require("../controllers/tideTechController")

router.get('/earthquakes', disasterController.getEarthquakes);
router.get('/hurricanes', disasterController.getHurricanes);
router.get('/tropical',tropicalStormController.getTropicalCycloneData);
router.get('/storms', tideTechController.fetchCurrentStorms);
router.get('/storms/:stormId/geoInfo', tideTechController.fetchStormDetails);

module.exports = router;
