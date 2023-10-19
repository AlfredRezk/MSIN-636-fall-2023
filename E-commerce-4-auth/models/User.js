const {Schema, model}= require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email:{
        type:String,
        required:[true, 'email is required'], 
        unique: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email']
    }, 
    password:{
        type: String, 
        require: true,
        trim:true,
        // select:false
    },
    role:{
        type:String, 
        enum:['user','admin'], 
        default:'user'
    }, 
    cart:{
        products:[{
            productId:{
                type:Schema.ObjectId,
                required:true,
                ref:'Product'
            },   
            qty:{type:Number}
        }], 
    }
})

// Methods => attached to instances  No arrow function for this keyword context 
// this keyword will be a refrence to the user instance 
userSchema.methods.addToCart = function(product){
    // If the product already in cart increase the qty 
    // if the product is not in the cart added to the cart with a default qty of 1 

    // Check if the product in the cart 
    const index = this.cart.products.findIndex(p=> p.productId.toString() === product._id.toString())
    let newQty = 1;
    const updatedCartProducts = [...this.cart.products]

    // Already in the cart
    if(index>=0){
        newQty = this.cart.product[index].qty+1;
        updatedCartProducts[index].qty = newQty;
    }else{
        // First time added to the cart 
        updatedCartProducts.push({productId:product._id, qty:newQty})
    }

    // update the cart 
    this.cart ={
        products:updatedCartProducts
    }

    return this.save();
}


userSchema.pre('save', async function(next){
    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
module.exports = model('User', userSchema);