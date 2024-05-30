// controllers/adminController.js
const jwt = require('jsonwebtoken');
const AdminCollection = require('../models/AdminSchema'); 
require('dotenv').config();

const adminsignin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AdminCollection.findOne({ username });

    if (admin) {
      if (admin.password === password) {
        const token = jwt.sign(
          { sub: admin._id, Role: admin.Role },
          process.env.JWT_SECRET,
          { expiresIn: '3d' }
        );
        return res.json({ admin, token, created: true });
      } else {
        const errors = { password: 'Please enter the correct password' };
        return res.json({ errors, admin: false });
      }
    } else {
      const errors = { username: 'Please enter the correct username' };
      return res.json({ errors, admin: false });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { adminsignin };
