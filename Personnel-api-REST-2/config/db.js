const {connect} = require('mongoose')

module.exports = async()=>{
 try{
    const mongo = await connect(process.env.MONGODB)
    console.log(`Connected to DB ${mongo.connection.host}`.yellow.underline)
 }catch(err){
    console.log(`${err.message}.red`)
 }
  
}