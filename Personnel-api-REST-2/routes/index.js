const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/department',require('./department'))
router.use('/personnel',require('./personnel'))
router.use('/documents', require('./documents'))


module.exports = router