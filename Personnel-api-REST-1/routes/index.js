const router = require('express').Router()

router.use('/auth', require('./auth'));
router.use('/department',require('./department'))
router.use('/personnel',require('./personnel'))


module.exports = router