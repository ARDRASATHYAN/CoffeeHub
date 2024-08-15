const express = require('express')
const categoryModel = require('../models/categoryModel')
const userModel = require('../models/userModel')
const userRouter = express.Router()





userRouter.get('/viewuser', async function (req, res) {
    try {
        const users= await userModel.find()
        if (users[0]!=undefined) {
            return res.status(200).json({
                success: false,
                error: true,
                data: users,
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


module.exports =userRouter