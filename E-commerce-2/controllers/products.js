const Product = require('../models/Product');
// @URL     GET /
// @access  PUBLIC
// @desc    list all products
exports.getProducts = async (req, res) => {
    const products = await Product.find();
  res.render("pages/home", { docTitle: "Home Page", products });
};

// @URL     GET /:id
// @access  PUBLIC
// @desc    Get a specific product details 
exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.prodId);
    console.log(req.params);
  res.render("pages/details", { docTitle: "Product Details", product });
};
