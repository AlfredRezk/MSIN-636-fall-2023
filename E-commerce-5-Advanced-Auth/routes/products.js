const router = require('express').Router();
const {getProducts, getProduct, postCart}= require('../controllers/products');
const { protect } = require('../middlewares/auth');

router.get("/",getProducts);
router.get('/:prodId', protect,  getProduct)
router.post('/cart', protect, postCart)

module.exports = router;
