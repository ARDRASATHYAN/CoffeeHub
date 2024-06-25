const express = require('express')

const orderModel = require('../models/orderModel');
const orderRouter = express.Router()


//  Add a new order
orderRouter.post('/orders', async (req, res) => {
    const { userId, items, totalPrice } = req.body;

    const newOrder = new orderModel({
        userId,
        items,
        totalPrice
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

orderRouter.get('/orders', async (req, res) => {
    try {
        const orders = await orderModel.find().populate('userId').populate('items.productId');
        console.log(orders);
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        });
    }
});


orderRouter.post('/orders/update/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
});


orderRouter.get('/orders/:userid', async (req, res) => {
    const userId = req.params.userid;
    try {
        const orders = await orderModel.find({ userId }).populate('userId').populate('items.productId');
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: true,
            message: "Something went wrong",
        });
    }
});


module.exports=orderRouter
