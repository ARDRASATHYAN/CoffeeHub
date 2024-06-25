const express = require('express')
const categoryModel = require('../models/categoryModel')
const productModel = require('../models/productModel')
const categoryRouter = express.Router()



categoryRouter.post('/category',async function(req,res){
    try{
       
       const category= {
          
           
            
        category:req.body.category,
        photo:req.body.photo,
           

        }
        const datas = await categoryModel(category).save()
       
        if(datas){
           
            return res.status(200).json({
                success:true,
                error:false,
                massege:"category added",
                data:datas,
            })
        }
    }catch{

        return res.status(400).json({
            success:false,
            error:true,
            message:"something went wrong",
            
        })
    }
})



categoryRouter.get('/viewcategory', async function (req, res) {
    try {
        const categorys= await categoryModel.find()
        if (categorys[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: categorys,
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


categoryRouter.get('/viewcategory/:id', async function (req, res) {
    
    try {
        const categoryId = req.params.id;
        const products = await productModel.find({ category_id: categoryId }).populate('category_id');

        if (products && products.length > 0) {
            return res.status(200).json({
                success: true,
                error: false,
                data: products,
            });
        } else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "No products found for this category",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong",
        });
    }
})


module.exports =categoryRouter