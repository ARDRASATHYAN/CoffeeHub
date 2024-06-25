const mongoose=require('mongoose')

const schema=mongoose.Schema

const categoryschema=new schema({
   
   category:{type:String},
   photo:{type:String},
  
})
const categoryModel = mongoose . model('category_tb',categoryschema)

module.exports = categoryModel