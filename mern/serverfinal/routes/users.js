const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// Create a new user
router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully', data: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // On successful sign-in, you can return user information or a token
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Add more routes as needed

module.exports = router;
