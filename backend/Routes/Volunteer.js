const express = require('express');
const { addVolunteer, getVolunteer } = require('../Controllers/VolunteerController');
const router = express.Router();

router.post('/volunteers', addVolunteer);
router.get('/volunteers', getVolunteer);

module.exports = router;