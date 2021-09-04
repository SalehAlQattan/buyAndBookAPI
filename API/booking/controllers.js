const { Booking } = require('../../db/models');

// create new booking
exports.createBooking = async (req, res, next) => {
  try {
    // search for booking
    const foundBooking = await Booking.findOne({
      where: { date: req.body.date },
    });
    //
    if (foundBooking) {
      const error = new Error('This Date is Not Available');
      error.status = 404;
      return next(error);
    }

    const newBooking = await Booking.create(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
};
