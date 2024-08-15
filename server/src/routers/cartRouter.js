const express = require('express');
const cartModel = require('../models/cartModel');

const cartRouter = express.Router()


cartRouter.get('/cart', async (req, res) => {
    try {
      const cartItems = await cartModel.find().populate('productId');
      console.log('cart',cartItems);
      res.json(cartItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Add a new item to the cart
  cartRouter.post('/addcart', async (req, res) => {
    const { productId, productName, price, quantity } = req.body;
  
    try {
      const newItem = new cartModel({ productId, productName, price, quantity });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update quantity of an item in the cart
  cartRouter.patch('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    console.log('Updating quantity for productId:', id);

    try {
        // Check if item exists
        const existingItem = await cartModel.findOne({ productId: id });

        console.log('Existing Item:', existingItem);

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the quantity
        const updatedItem = await cartModel.findOneAndUpdate(
            { productId: id },
            { quantity },
            { new: true }
        );

        console.log('Updated Item:', updatedItem);

        if (!updatedItem) {
            return res.status(404).json({ message: "Failed to update item" });
        }

        res.json(updatedItem);
    } catch (err) {
        console.error('Error updating quantity:', err);
        res.status(400).json({ message: err.message });
    }
});
  
  // Delete an item from the cart
  cartRouter.get('/cart/:id', async (req, res) => {
    const id = req.params.id; // Access id directly from req.params
console.log('i',id);
    try {
        const deletedItem = await cartModel.deleteOne({ productId: id });
console.log('delet',deletedItem);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json({ message: 'Deleted item from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports =cartRouter