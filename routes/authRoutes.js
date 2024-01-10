// authRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User already exists, send a response or redirect as needed
      return res.json({ success: false, message: 'User already exists. Please log in.' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Send a success response or redirect as needed
    res.json({ success: true, message: 'Signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check user credentials
    const user = await User.findOne({ username, password });

    if (!user) {
      // User not found or invalid credentials, send a response or redirect as needed
      // Check if the user is not registered
      const isUserRegistered = await User.findOne({ username });

      if (!isUserRegistered) {
        // User is not registered, show a SweetAlert warning notification
        return res.json({ success: false, message: 'User not registered. Please sign up.' });
      }

      // User is registered but credentials are invalid, show a different message
      return res.json({ success: false, message: 'Invalid credentials. Please try again.' });
    }

    // User found, send a success response or redirect as needed
    res.json({ success: true, message: 'Signin successful!' });
  } catch (error) {
    console.error('Error during signin:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Check user route (for existing user check)
router.post('/checkUser', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User already exists
      res.json({ exists: true });
    } else {
      // User doesn't exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error during user check:', error);
    res.status(500).json({ exists: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
