const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');

router.get('/earthquakes', disasterController.getEarthquakes);
router.get('/hurricanes', disasterController.getHurricanes);

module.exports = router;
