const User = require("../models/User");
const bcrypt = require('bcryptjs');


// @URL     GET /auth/login
// @Access  Public 
// @Desc    View the login page
exports.getLogin = (req, res, next)=>{
    res.render('pages/auth/login', {docTitle:'Login'});
}

// @URL     GET /auth/signup
// @Access  Public 
// @Desc    View the signup page
exports.getSignup = (req, res, next)=>{
    res.render('pages/auth/signup', {docTitle: 'Sign-up'});
}


// @URL     POST /auth/signup
// @Access  Public 
// @Desc    Process the signup form
exports.postSignup = async(req, res)=>{
    const {email, password, password2} = req.body;
    // Check if that user already exists in the DB
    const userData = await User.findOne({email:email})
    //if there is a user with this email redirect the user to the signup page 
    if(userData) {
        req.flash('error', 'User already exists in database!')
        return res.redirect('/auth/signup');
    }
    // if the user is not exists in the db create this user and redirect to login page
    const user = new User({password, email});
    await user.save();
    req.flash('success', 'User successfuly signed up!');
    res.redirect('/auth/login');
}

// @URL     POST /auth/login
// @Access  Public 
// @Desc    Process the login form
exports.postLogin = async(req, res)=>{
    const {email, password} = req.body;
    // Check if that user already exists in the DB
    const user = await User.findOne({email:email})
    if(!user) {
        req.flash('error', 'User is not exists in database !')
        return res.redirect('/auth/login');
    }
    // login the user 
    // Compare the entered password with the stored password in database
    const result = await bcrypt.compare(password, user.password)
    if(!result){
        req.flash('error', 'Invalid credinitals');
        return res.redirect('/auth/login');
    } 
    // If password is correct login user / start session 
    req.session.isLoggedIn  = true;
    req.session.user = user;
    await req.session.save()
    req.flash('success', 'Logged in successfully!');
    res.redirect('/');
}


// @URL     GET /auth/logout
// @Access  Private 
// @Desc    logout a user
exports.getLogout = async (req, res)=>{
    await req.session.destroy();
    res.redirect('/auth/login');
}