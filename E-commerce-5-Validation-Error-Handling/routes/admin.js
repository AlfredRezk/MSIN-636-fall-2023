const router = require("express").Router();
const { getAdd, postAdd, getProducts, getDelete, postDelete, getEdit, postEdit } = require("../controllers/admin");
const { protect, authorize } = require("../middlewares/auth");
const { addProduct } = require("../validation/admin");


router.use(protect, authorize('admin'));

router
.route("/add")
.get( getAdd)
.post(addProduct(), postAdd);

router.route('/products').get( getProducts)

// router.get('/delete/:prodId', getDelete)

router.post('/delete', postDelete)
router.get('/edit/:prodId', getEdit)
router.post('/edit', addProduct(),postEdit)
module.exports = router;
