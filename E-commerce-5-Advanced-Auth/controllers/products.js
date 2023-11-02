const Product = require('../models/Product');
const User = require('../models/User');
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


// @URL     POST /cart
// @access  PRIVATE
// @desc    Add item to cart
exports.postCart = async(req, res)=>{
  const id = req.body.id;
  const product = await Product.findById(id)
  // Add the product to the user cart
  const user = await User.findById(req.user._id);
  console.log(user);
  await user.addToCart(product);
  req.flash('success', 'Product added to Cart!');
  res.redirect('/')
} 
