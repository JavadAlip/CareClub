
const express = require('express');
const router = express.Router();
const generateToken = require('../Utils/generateToken');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // Generate JWT token
    const token = generateToken({ username });

    res.json({
      success: true,
      token,
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

module.exports = router;
