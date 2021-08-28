// library
const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');

// controllers
const {
  fetchProducts,
  fetchSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers');

// param middleware
router.param('productId', async (req, res, next, productId) => {
  const product = await fetchSingleProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const error = new Error('Product Not Found!');
    error.status = 404;
    next(error);
  }
});

// multer
const storage = multer.diskStorage({
  destination: './media',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}}`);
  },
});
// multer upload
const upload = multer({ storage });

// all product route
router.get('/', fetchProducts);

// create product
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  createProduct
);

// update product
router.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  updateProduct
);

// delete product
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
);

module.exports = router;
