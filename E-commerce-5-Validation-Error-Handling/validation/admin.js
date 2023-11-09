const { body } = require("express-validator");
exports.addProduct = ()=>{
    return [
        body("title").notEmpty().withMessage("Please Provide a Title")
        .isLength({min:10}).withMessage('Title is 10 characters Min'),
        body("price")
          .notEmpty()
          .withMessage("Please provide a Price"),
        body('image')
        .notEmpty()
        .withMessage("Please provide a image URL")
        .isURL().withMessage('Please provide a valid image URL')
    ]; 
}