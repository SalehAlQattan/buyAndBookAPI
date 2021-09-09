const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the schema
const bookingSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
});

// creatnig the model
const Booking = mongoose.model('Booking', bookingSchema);

// exporting the model
module.exports = Booking;
