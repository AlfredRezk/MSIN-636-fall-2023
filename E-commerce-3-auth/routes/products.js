const router = require('express').Router();
const {getProducts, getProduct}= require('../controllers/products')

router.get("/",getProducts);
router.get('/:prodId', getProduct)

module.exports = router;
