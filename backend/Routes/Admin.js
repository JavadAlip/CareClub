const express = require('express');
const router = express.Router();
const { adminSignin } = require('../controllers/adminController');

router.post('/login', adminSignin);


module.exports = router;
