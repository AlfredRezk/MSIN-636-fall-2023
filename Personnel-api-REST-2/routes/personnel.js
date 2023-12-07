const router = require('express').Router()
const perCtrl = require('../controllers/personnel');
const { protect, isAdmin, isAdminOrOwner } = require('../middlewares/permissions');
const query = require('../middlewares/query')

const Personnel = require('../models/Personnel')
router.use(protect)
router.route('/')
.get(isAdmin, query(Personnel, 'departmentId'), perCtrl.list)
.post(perCtrl.create);

router.route('/:id')
.put(isAdminOrOwner, perCtrl.update)
.patch(isAdminOrOwner, perCtrl.update)
.delete(isAdmin, perCtrl.delete)
.get(isAdminOrOwner, perCtrl.read);


module.exports = router