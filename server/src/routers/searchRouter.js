const express = require('express');
const productModel = require('../models/productModel');


const searchRouter = express.Router()


searchRouter.get('/search', async (req, res) => {
  const { productName } = req.query;

  let filter = {};

  if (productName) {
    filter.productname = { $regex: new RegExp(productName, 'i') }; // case-insensitive search
  }

  try {
    const products = await productModel.find(filter).populate('category_id');
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching search results');
  }
});
  module.exports= searchRouter