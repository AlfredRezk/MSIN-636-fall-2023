const ErrorResponse = require('../utils/ErrorResponse')

 const errorHandler = (err, req, res, next)=>{
    let error = {...err}
    error.message = err.message;
    console.log(err.stack.red)
   

    // Mongoose Validation errors
    if(err.name==='ValidationError'){
        const message = Object.values(err.errors).map(item=> item.message)
        // err.statusCode = 400;
        // throw new Error(message)
        error = new ErrorResponse(400, message)
    }

    res.status(error.statusCode|| 500).json({
        success:false, 
        error: error.message || 'Server internal Error'
    })

}

module.exports = errorHandler