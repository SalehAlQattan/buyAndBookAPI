const { Product } = require('../../db/models');

// fetch all products
exports.fetchProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attribute: { exclude: ['id', 'createdAt', 'updatedAt'] },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// fetch single product
exports.fetchSingleProduct = async (productId, next) => {
  try {
    return await Product.findByPk(productId);
  } catch (error) {
    next(error);
  }
};

// create new product
exports.createProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get('host')}/${req.file.path}`;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// update product
exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get('host')}/${req.file.path}`;
    const updatedProduct = await req.product.update(req.body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const foundProduct = req.product;
    if (foundProduct) await foundProduct.destroy();
    res.status(201).end();
  } catch (error) {
    res.status(404).json({ message: 'Product Not Found' });
    next(error);
  }
};
