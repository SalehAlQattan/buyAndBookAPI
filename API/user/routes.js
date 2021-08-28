// library
const express = require('express');
const passport = require('passport');

// controllers
const { signup, signin } = require('./controllers');

// new instance of router from express
const router = express.Router();

router.post('/signup', signup);

router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signin
);

module.exports = router;
