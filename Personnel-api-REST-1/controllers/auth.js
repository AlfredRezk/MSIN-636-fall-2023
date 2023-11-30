const jwt = require('jsonwebtoken');
const Personnel = require('../models/Personnel');
const ErrorResponse = require('../utils/ErrorResponse')


// @URL     POST /api/auth/login
// @access  Public 
// @desc    Login a personnel
exports.login = async(req, res)=>{
    const {username, password} = req.body
    if(!username|| !password)
        throw new ErrorResponse(401, 'Please provide username and password')
    const user = await Personnel.findOne({username})
    if(!user)
        throw new ErrorResponse(401, 'Wrong username or password')
    if(!user.isActive)
        throw new ErrorResponse(401, 'Account is not active')
    const isMatched = await user.matchPassword(password)
    if(!isMatched)
        throw new ErrorResponse(401, 'Wrong username or password')

    // Generate token for the user 
    const payload = {_id: user._id}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'10m'})
    res.status(200).json({
        success: true, 
        token
    })
}

// @URL     POST /api/auth/logout
// @access  Private
// @desc    Login a personnel

exports.logout = async(req, res)=>{
    res.status(200).json({
        success: true, 
        message:"No need, Delete token from your browser"
    })
}