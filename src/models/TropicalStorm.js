const mongoose = require('mongoose');

const TropicalStormSchema = new mongoose.Schema({
  type: { type: String, default: 'Tropical Storm' },
  name: String,
  visibility: Number,
  open: Number,
  tcType: String,
  tcName: String,
  wallet: String,
  atcfID: String,
  centerLat: Number,
  centerLon: Number,
  dateTime: String,
  movement: String,
  minimumPressure: String,
  maxSustainedWind: String,
  headline: String,
  links: [{
    id: String,
    name: String,
    visibility: Number,
    open: Number,
    href: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TropicalStorm', TropicalStormSchema);
