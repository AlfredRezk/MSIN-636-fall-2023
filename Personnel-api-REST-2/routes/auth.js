const router = require('express').Router()
const authCtrl = require('../controllers/auth')
const {protect} = require('../middlewares/permissions')

router.all('/', (req, res)=>{
    res.json({
        login:'/api/auth/login',
        logout: '/api/auth/logout'
    })
})
router.post('/login', authCtrl.login)
router.all('/logout',protect, authCtrl.logout)


module.exports = router