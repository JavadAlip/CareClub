const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user data to request object
      req.user = decoded;
      next();
    } catch (error) {
      // Token verification failed
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    // No token found in headers
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
