const {Schema, model} = require('mongoose');
const {hash, genSalt, compare} = require('bcryptjs')

const PersonnelSchema = new Schema({
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:'Department',
        required:true
    }, 
    username:{
        type:String, 
        trim:true, 
        required:[true, 'Username is required'],
        unique: true
    }, 
    password:{
        type:String, 
        trim:true, 
        required:[true, 'Password is required']
    }, 
    firstName: {
        type:String, 
        trim:true, 
        required:[true, 'FirstName is required']
    }, 
    lastName:{
        type:String, 
        trim:true, 
        required:[true, 'lastName is required']
    }, 
    phone:{
        type:String, 
        trim:true, 
        required:[true, 'Phone number is required']
    }, 
    email:{
        type:String, 
        trim:true, 
        required:[true, 'Email is required'], 
        unique: true, 
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please add a valid email']
    }, 
    title:{
        type:String, 
        trim:true, 
        required:[true, 'Title is required'] 
    }, 
    salary:{
        type: Number, 
        default:0
    }, 
    description:{
        type: String, 
        trim: true, 
        default: null
    }, 
    isActive:{
        type:Boolean, 
        default: true
    }, 
    isAdmin:{
        type:Boolean, 
        default: false
    }, 
    isLead:{
        type:Boolean, 
        default: false
    }, 
    startedAt:{
        type: Date, 
        default: Date.now()
    }

}, {timestamps:true})

PersonnelSchema.pre('save',async function(next){

    // Encrypt password
    const salt  = await genSalt(12)
    this.password = await hash(this.password, salt)
    next()

})

PersonnelSchema.methods.matchPassword = function(enteredPassword){  

    return compare(enteredPassword, this.password)
}

module.exports = model('Personnel', PersonnelSchema)