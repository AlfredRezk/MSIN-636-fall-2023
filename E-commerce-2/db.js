const {connect} = require('mongoose')

const connectDB = async()=>{
   await connect(process.env.MONGO_URI);
    console.log(`Connected to DB`.yellow.underline);
}

module.exports = connectDB;