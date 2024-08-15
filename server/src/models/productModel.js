const mongoose=require('mongoose')

const schema=mongoose.Schema

const productschema = new schema({
    category_id: { type: mongoose.Types.ObjectId, ref: 'category_tb', required: true },
    productname: { type: String, required: true },
    description: { type: String, required: true },
    availability: { type: Boolean, default: false }, // Corrected spelling
    price: { type: String, required: true },
    photo: { type: String, required: true },
 });
 
 const productModel = mongoose.model('product_tb', productschema);

module.exports = productModel