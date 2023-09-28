const router = require('express').Router();
const {getProducts, getProduct}= require('../controllers/products')

router.get('/:prodId', getProduct)
router.get("/",getProducts);

module.exports = router;
