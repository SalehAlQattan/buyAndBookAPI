// library
const express = require('express');
const router = express.Router();
const passport = require('passport');

// controllers
const { createBooking } = require('./controllers');

// param middleware in case we need to update the date

// create booking
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createBooking
);

module.exports = router;
