// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time
  });
};

module.exports = generateToken;
