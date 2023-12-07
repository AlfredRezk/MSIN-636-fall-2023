const router = require('express').Router()
const depCtrl = require('../controllers/department');
const {protect, isAdmin, isAdminOrLead} = require('../middlewares/permissions')
const query = require('../middlewares/query') 
const Department = require('../models/Department')

router.use(protect)
router.route('/')
.get( isAdmin, query(Department),  depCtrl.list)
.post(isAdmin, depCtrl.create);

router.route('/:id')
.put( isAdmin, depCtrl.update)
.patch(isAdmin, depCtrl.update)
.delete(isAdmin, depCtrl.delete)
.get(isAdmin, depCtrl.read);

router.get('/:id/personnels', isAdminOrLead, depCtrl.getPeronnels)


module.exports = router