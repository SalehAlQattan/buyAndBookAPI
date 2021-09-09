const Booking = require('../../db/models/Booking');

// create new booking

exports.createBooking = async (req, res, next) => {
  // search for booking
  try {
    const foundBooking = await Booking.find({ date: req.body.date });
    if (foundBooking) {
      const error = new Error('This Date is Not Available');
      error.status = 404;
      return next(error);
    }

    // create new booking
    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
