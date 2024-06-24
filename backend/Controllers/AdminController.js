const jwt = require('jsonwebtoken');
const AdminCollection = require('../models/AdminSchema');
require('dotenv').config();

const adminSignin = async (req, res) => {
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
        return res.status(200).json({ admin, token, created: true });
      } else {
        return res.status(401).json({ errors: { password: 'Please enter the correct password' } });
      }
    } else {
      return res.status(401).json({ errors: { username: 'Please enter the correct username' } });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { adminSignin };
