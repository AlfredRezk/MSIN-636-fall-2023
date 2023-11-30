const router = require('express').Router()
const perCtrl = require('../controllers/personnel');

router.route('/')
.get(perCtrl.list)
.post(perCtrl.create);

router.route('/:id')
.put(perCtrl.update)
.patch(perCtrl.update)
.delete(perCtrl.delete)
.get(perCtrl.read);


module.exports = router