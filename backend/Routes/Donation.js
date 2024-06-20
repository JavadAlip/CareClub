const express = require('express');
const { addDonation, getDonation } = require('../Controllers/DonationController');

const router = express.Router();

router.post('/donations', addDonation);
router.get('/donations', getDonation);

module.exports = router;
// routes/donationRoutes.js

// const express = require('express');
// const { createCheckoutSession } = require('../controllers/DonationController');

// const router = express.Router();

// router.post('/create-checkout-session', createCheckoutSession);

// module.exports = router;
