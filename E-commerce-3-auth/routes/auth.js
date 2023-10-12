const { getLogin, getSignup, postSignup, postLogin, getLogout } = require('../controllers/auth');

const router = require('express').Router();

router.get('/login', getLogin);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.post('/login', postLogin);
router.get('/logout', getLogout);




module.exports  = router;