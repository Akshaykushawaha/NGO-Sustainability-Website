const express = require('express');
const router = express.Router();

// Import the Product model
const Product = require('../models/product');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created successfully', data: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const result = await Product.findByIdAndUpdate(productId, updatedProductData);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await Product.findByIdAndDelete(productId);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
