const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const {protect} = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {paymentMethod, shippingAddress} = req.body;

    const cart = await Cart.findOne({userId: req.user._id}).populate(
      'items.productId',
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        error_msg: 'Cart is empty',
      });
    }

    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      quantity: item.quantity,
      imageUrl: item.productId.imageUrl,
    }));

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      totalAmount: cart.totalAmount,
      paymentMethod: paymentMethod || 'COD',
      shippingAddress: shippingAddress || {},
    });

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({userId: req.user._id}).sort({
      createdAt: -1,
    });

    res.json({
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        error_msg: 'Order not found',
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

module.exports = router;


