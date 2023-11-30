const router = require('express').Router()
const depCtrl = require('../controllers/department');

router.route('/')
.get(depCtrl.list)
.post(depCtrl.create);

router.route('/:id')
.put(depCtrl.update)
.patch(depCtrl.update)
.delete(depCtrl.delete)
.get(depCtrl.read);

router.get('/:id/personnels', depCtrl.getPeronnels)


module.exports = router