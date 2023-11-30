const router = require('express').Router()
const authCtrl = require('../controllers/auth')


router.all('/', (req, res)=>{
    res.json({
        login:'/api/auth/login',
        logout: '/api/auth/logout'
    })
})
router.post('/login', authCtrl.login)
router.all('/logout',authCtrl.logout)


module.exports = router