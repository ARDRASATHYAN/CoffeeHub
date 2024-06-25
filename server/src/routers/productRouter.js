const express = require('express');
const productRouter = express.Router();
const productModel = require('../models/productModel');

productRouter.post('/product', async function(req, res) {
    try {
        const product = {
            productname: req.body.productname,
            description: req.body.description,
            price: req.body.price,
            availability: req.body.availability,
            category_id: req.body.category_id,
            category:req.body.category,
            photo: req.body.photo,
        };

        const datas = await productModel(product).save();
        res.status(200).json({
            status: 'Success',
            data: datas,
        });
    } catch (error) {
        console.warn(error);
        res.status(500).json({
            status: 'Failed',
            message: error.message,
        });
    }
});


productRouter.get('/viewproduct', async function (req, res) {
    try {
        const product= await productModel.find().populate('category_id');
        if (product[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: product,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})



productRouter.get('/delete/:id',async(req,res)=>{ 
    try{
        const id=req.params.id
        const data3=await productModel.findByIdAndDelete(id)
        console.log(id);
        if(data3){
           
            return res.status(200).json({
                success:true,
                error:false,
                data:data3
            })
        }
        
        
    }catch{
        return res.status(200).json({
            success:false,
            error:true,
           
        })

    }
})

productRouter.post('/updateproduct/:id', async function (req, res) {
    try {
        const userid = req.params.id
        console.log("p_id",userid);
        const data={
            productname: req.body.productname,
            description: req.body.description,
            price: req.body.price,
            availability: req.body.availability,
            category_id: req.body.category_id,
            category:req.body.category,
            photo: req.body.photo,
        }
        console.log("data",data);
        console.log(userid);
        const user = await productModel.updateOne({_id:userid},{$set:data}).populate('category_id');
        if (user) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

productRouter.get('/productone/:id', async function (req, res) {
    try {
        console.log("haiiiii",req.params.id);
        const user = await productModel.findOne({_id:req.params.id}).populate('category_id');
        console.log("helo",user);
        if (user) {
            return res.status(200).json({
                success: true,
                error: false,
                data: user,
            })
        }
        else{
            return res.status(400).json({
                success: false,
                error: true,
                message: "no data found",
            })
        }

    } catch {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        })
    }

})

module.exports = productRouter;
