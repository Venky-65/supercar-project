const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  carDescription: { type: String, required: true },
  bookingTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
