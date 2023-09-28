const router = require("express").Router();
const { getAdd, postAdd } = require("../controllers/admin");

router
.route("/add")
.get(getAdd)
.post(postAdd);


module.exports = router;
