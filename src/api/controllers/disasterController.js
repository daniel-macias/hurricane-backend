const axios = require('axios');

exports.getEarthquakes = async (req, res) => {
    try {
        // Get current date and the date 24 hours ago
        const endDate = new Date();
        const startDate = new Date(new Date().setDate(endDate.getDate() - 1));
        const formatDateString = (date) => date.toISOString().split('T')[0];

        // Define the latitude and longitude bounds for Central America
        const minLatitude = 8.0;   // Southernmost point approx.
        const maxLatitude = 15.0;  // Northernmost point approx.
        const minLongitude = -93.0; // Westernmost point approx.
        const maxLongitude = -77.0; // Easternmost point approx.

        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
            params: {
                format: 'geojson',
                starttime: formatDateString(startDate),
                endtime: formatDateString(endDate),
                minlatitude: minLatitude,
                maxlatitude: maxLatitude,
                minlongitude: minLongitude,
                maxlongitude: maxLongitude
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch earthquake data:', error);
        res.status(500).send('Failed to fetch earthquake data');
    }
};

exports.getHurricanes = (req, res) => {
    res.send('Hurricane data will be here.');
};
