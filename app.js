// library
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// setting the app
const app = express();

// importing db
const db = require('./db/models');

// importing routes
const productRoutes = require('./API/product/routes');
const userRoutes = require('./API/user/routes');

// passport
const passport = require('passport');
const { localStrategy } = require('./middleware/passport');
const { jwtStrategy } = require('./middleware/passport');

// middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// routes middleware
app.use('/products', productRoutes);
app.use(userRoutes);

app.use('/media', express.static('media'));

// Error Handling Middleware
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || 'Internal Server Error' });
});

// Path Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found.' });
});

// running the app and connecting to db
const run = async () => {
  try {
    // connecting to db
    await db.sequelize.sync({ alter: true });
    console.log('Connected to Database Successfully');
    // running the server
    app.listen(8000, () =>
      console.log('Server Successfully Running on Port 8000')
    );
  } catch (error) {}
};
run();
