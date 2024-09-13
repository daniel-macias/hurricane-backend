const axios = require('axios');

// Fetches the list of current storms from the TideTech API
exports.fetchCurrentStorms = async (req, res) => {
    try {
        const { data } = await axios.get('https://storm.tidetech.org/v1/active');
        res.json(data);
    } catch (error) {
        console.error('Error fetching storm list:', error);
        res.status(500).send('Failed to fetch storm list');
    }
};

// Fetches detailed GeoJSON data for a specific storm from the TideTech API
exports.fetchStormDetails = async (req, res) => {
    const stormId = req.params.stormId; 
    try {
        const { data } = await axios.get(`https://storm.tidetech.org/v1/storm/${stormId}/features`);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching details for storm ${stormId}:`, error);
        res.status(500).send(`Failed to fetch details for storm ${stormId}`);
    }
};

