const {Schema, model}= require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email:{
        type:String,
        required:true, 
        unique: true
    }, 
    password:{
        type: String, 
        require: true
    }
})



userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
module.exports = model('User', userSchema);