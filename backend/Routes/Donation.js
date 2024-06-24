const express = require('express');
const { addDonation, getDonation } = require('../Controllers/DonationController');
const router = express.Router();

router.post('/donations', addDonation);
router.get('/donations', getDonation);

module.exports = router;
