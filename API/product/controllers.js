const Product = require('../../db/models/Product');

exports.fetchProducts = async (req, res, next) => {
  try {
    // const products = await Product.find({}, { _id: 0, __v: 0 });
    const products = await Product.find({}, { __v: 0 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.fetchSingleProduct = async (productId, next) => {
  try {
    return await Product.findById(productId);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/${req.file.path}`;
    }
    const newProduct = await new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/${req.file.path}`;
    }
    const foundProduct = req.product;
    if (foundProduct) {
      await Product.findByIdAndUpdate(foundProduct.id, req.body);
    }
    // fix the response
    res.json(foundProduct);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const foundProduct = req.product;
    if (foundProduct) await Product.findByIdAndDelete(foundProduct.id);
    res.status(201).end();
  } catch (error) {
    res.status(404).json({ message: 'Product Not Found' });
    next(error);
  }
};
