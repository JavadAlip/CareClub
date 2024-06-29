const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { adminSignin } = require('../controllers/AdminController');
=======
const { adminSignin } = require('../Controllers/AdminController');
>>>>>>> f269559e2d4aafe21f8cc6d145631457e3e5a021
router.post('/login', adminSignin);
module.exports = router;
