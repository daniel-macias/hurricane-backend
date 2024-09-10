const mongoose = require('mongoose');
require('dotenv').config();  

const connectionString = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_CLUSTER_URL}/CuculcanDB?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
