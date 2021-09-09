const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating the Schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating the model
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;
