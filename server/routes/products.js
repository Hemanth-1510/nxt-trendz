const express = require('express');
const Product = require('../models/Product');
const {protect} = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {sort_by, category, title_search, rating} = req.query;

    let query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by rating
    if (rating) {
      query.rating = {$gte: parseFloat(rating)};
    }

    // Search by title
    if (title_search) {
      query.title = {$regex: title_search, $options: 'i'};
    }

    let products = await Product.find(query);

    // Sort products
    if (sort_by) {
      switch (sort_by) {
        case 'PRICE_HIGH':
          products = products.sort((a, b) => b.price - a.price);
          break;
        case 'PRICE_LOW':
          products = products.sort((a, b) => a.price - b.price);
          break;
        default:
          products = products.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    // Transform to match frontend format
    const formattedProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image_url: product.imageUrl,
      rating: product.rating,
      category: product.category,
      availability: product.availability,
    }));

    res.json({
      products: formattedProducts,
      total: formattedProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findOne({id: req.params.id});

    if (!product) {
      return res.status(404).json({
        error_msg: 'Product not found',
      });
    }

    // Get similar products (same category)
    const similarProducts = await Product.find({
      category: product.category,
      id: {$ne: product.id},
    }).limit(3);

    const formattedProduct = {
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      image_url: product.imageUrl,
      rating: product.rating,
      category: product.category,
      availability: product.availability,
      description: product.description,
      similar_products: similarProducts.map(p => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        image_url: p.imageUrl,
        rating: p.rating,
      })),
    };

    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

module.exports = router;


