
require('dotenv').config();

module.exports = (req, res, next) => {
  const { username, password } = req.body;

  const fixedUsername = process.env.ADMIN_USERNAME;
  const fixedPassword = process.env.ADMIN_PASSWORD;

  if (username === fixedUsername && password === fixedPassword) {
    next();
  } else {
    res.status(401).send('Unauthorized: Invalid credentials');
  }
};
