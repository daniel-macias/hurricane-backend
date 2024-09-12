const express = require('express');
const app = express();
const routes = require('./src/api/routes');
const mongoose = require('./src/config/database');
const cors = require('cors');

app.use(cors());

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Check the MongoDB connection
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
        // Connection Successful
        console.log("MongoDB connected successfully");
    });
});