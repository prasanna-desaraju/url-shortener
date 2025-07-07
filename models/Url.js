const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true },
  longUrl: String,
});

module.exports = mongoose.model('Url', urlSchema);
