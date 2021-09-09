// passport
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;
const bycrpt = require('bcrypt');

// keys
const { JWT_SECRET } = require('../config/keys');

// model
const User = require('../db/models/User');

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    const passwordsMatch = user
      ? await bycrpt.compare(password, user.password)
      : false;
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
