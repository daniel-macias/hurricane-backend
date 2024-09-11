const mongoose = require('mongoose');

const WindSpeedProbabilitySchema = new mongoose.Schema({
  type: { type: String, default: 'Wind Speed Probability' },
  name: String,
  visibility: Number,
  open: Number,
  links: [{
    id: String,
    name: String,
    visibility: Number,
    open: Number,
    href: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WindSpeedProbability', WindSpeedProbabilitySchema);
