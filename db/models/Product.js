// library
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

// creating the schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, 'Price is too low'],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity Cant Be Less Than 1'],
  },
  image: {
    type: String,
  },
});

// Creating the model
const Product = mongoose.model('Product', productSchema);

// exporting the model
module.exports = Product;
