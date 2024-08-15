const mongoose=require('mongoose')

const schema=mongoose.Schema


const userSchema = new schema({
    login_id:{type:mongoose.Types.ObjectId,ref:'login_tb'},  
    email :{type:String},
   

})
const userModel = mongoose.model('userreg_tb',userSchema)

module.exports = userModel