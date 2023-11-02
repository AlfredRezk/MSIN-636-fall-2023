const auth = require('../controllers/auth');

const router = require('express').Router();

router.get('/login', auth.getLogin);
router.get('/signup', auth.getSignup);
router.post('/signup', auth.postSignup);
router.post('/login', auth.postLogin);
router.get('/logout', auth.getLogout);
// Advanced Authentication 
router.get('/forgetpassword', auth.getForgetPassword);
router.post('/forgetpassword', auth.postForgetPassword);
router.get('/resetpassword/:resetToken', auth.getResetPassword);
router.post('/resetpassword', auth.postResetPassword);

module.exports  = router;