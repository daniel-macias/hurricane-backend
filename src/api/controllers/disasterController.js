const axios = require('axios');

exports.getEarthquakes = async (req, res) => {
    try {
        // Get current date and the date 24 hours ago
        const endDate = new Date();
        const startDate = new Date(new Date().setDate(endDate.getDate() - 1));
        const formatDateString = (date) => date.toISOString().split('T')[0];

        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
            params: {
                format: 'geojson',
                starttime: formatDateString(startDate),
                endtime: formatDateString(endDate)
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
