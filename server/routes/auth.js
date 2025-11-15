const express = require('express');
const User = require('../models/User');
const {protect} = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const {username, password, name} = req.body;

    if (!username || !password || !name) {
      return res.status(400).json({
        error_msg: 'Please provide username, password, and name',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error_msg: 'Password must be at least 8 characters',
      });
    }

    // Check if user exists
    const userExists = await User.findOne({username: username.toLowerCase()});

    if (userExists) {
      return res.status(400).json({
        error_msg: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      username: username.toLowerCase(),
      password,
      name,
    });

    const token = user.generateToken();

    res.status(201).json({
      jwt_token: token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error_msg: 'Please provide username and password',
      });
    }

    // Find user and include password
    const user = await User.findOne({username: username.toLowerCase()}).select(
      '+password',
    );

    if (!user) {
      return res.status(401).json({
        error_msg: 'Invalid username or password',
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error_msg: 'Invalid username or password',
      });
    }

    const token = user.generateToken();

    res.json({
      jwt_token: token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({
      error_msg: 'Server error',
    });
  }
});

module.exports = router;


