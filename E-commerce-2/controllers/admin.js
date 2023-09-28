const Product = require('../models/Product');

// @URL     GET /admin/add
// @access  Private
// @desc    Get the add form page
exports.getAdd = (req, res) => {
  res.render("pages/add", { docTitle: "ADD PRODUCT" });
};


// @URL     POST /admin/add
// @access  Private
// @desc    Store the product in DB
exports.postAdd = async (req, res) => {
  const product = new Product(req.body)
  await product.save()

  // await Product.create(req.body);
  res.redirect("/");
};
