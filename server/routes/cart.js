const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {protect} = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({userId: req.user._id}).populate(
      'items.productId',
    );

    if (!cart) {
      cart = await Cart.create({userId: req.user._id, items: []});
    }

    const formattedCart = cart.items.map(item => ({
      id: item.productId.id,
      title: item.productId.title,
      brand: item.productId.brand,
      price: item.productId.price,
      image_url: item.productId.imageUrl,
      rating: item.productId.rating,
      quantity: item.quantity,
    }));

    res.json({
      cartList: formattedCart,
      totalAmount: cart.totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post('/add', protect, async (req, res) => {
  try {
    const {id, quantity = 1} = req.body;

    if (!id) {
      return res.status(400).json({
        error_msg: 'Product ID is required',
      });
    }

    const product = await Product.findOne({id});

    if (!product) {
      return res.status(404).json({
        error_msg: 'Product not found',
      });
    }

    let cart = await Cart.findOne({userId: req.user._id});

    if (!cart) {
      cart = await Cart.create({userId: req.user._id, items: []});
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === product._id.toString(),
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    res.json({
      message: 'Item added to cart',
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   PUT /api/cart/update
// @desc    Update cart item quantity
// @access  Private
router.put('/update', protect, async (req, res) => {
  try {
    const {productId, quantity} = req.body;

    const cart = await Cart.findOne({userId: req.user._id});

    if (!cart) {
      return res.status(404).json({
        error_msg: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        error_msg: 'Item not found in cart',
      });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.json({
      message: 'Cart updated',
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   DELETE /api/cart/remove/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.user._id});

    if (!cart) {
      return res.status(404).json({
        error_msg: 'Cart not found',
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId,
    );

    await cart.save();

    res.json({
      message: 'Item removed from cart',
      cart: cart,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear cart
// @access  Private
router.delete('/clear', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.user._id});

    if (!cart) {
      return res.status(404).json({
        error_msg: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      message: 'Cart cleared',
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

module.exports = router;


