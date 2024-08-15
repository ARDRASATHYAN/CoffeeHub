const express = require('express');
const bcrypt = require('bcryptjs');

const loginModel = require('../models/loginModel');
const userModel = require('../models/userModel');





const registerRouter = express.Router()








registerRouter.post('/userreg',async function(req,res){
    try{
        console.log(req.body.username);
        const oldUser =await loginModel.findOne({username:req.body.username })
        console.log(oldUser);
        if(oldUser){
            return res.status(400).json({
                success:false,
                error:true,
                mesage:"Username already exist",
            })
        }
        // const oldPhone =await userModel.findOne({u_phone:req.body.u_phone })
        // if(oldPhone){
        //     return res.status(400).json({
        //         success:false,
        //         error:true,
        //         mesage:"Phone number already exist",
        //     })
        // }
        const hashedpass = await bcrypt.hash(req.body.password,12)
        const login={
            password:hashedpass,
            username:req.body.username,    
             
            role:1,
            status:0,
        }

        const login_data = await loginModel(login).save()


        const userreg = {
          
            login_id:login_data._id,
           
            email :req.body.email,
               

        }
        const datas = await userModel(userreg).save()
        if(datas){
            return res.status(200).json({
                success:true,
                error:false,
                massege:"registeration completed",
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
module.exports=registerRouter