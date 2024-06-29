const express = require('express');
const router = express.Router();
const { adminSignin } = require('../controllers/AdminController');
router.post('/login', adminSignin);
module.exports = router;
