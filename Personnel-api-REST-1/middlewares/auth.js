const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
    const auth = req.headers?.authorization || null 
    const token = auth? auth.split(' ')[1] : null

    jwt.verify(token, process.env.JWT_SECRET, function (error, data){
        if(error){
            req.user = null;
            console.log('JWT Error')
        }else{
            req.isLogin = true, 
            req.userId = data
        }
    })



    next()
}