const express = require('express');
const router = express.Router();
const {
  addEvent,
  getAllEvents,
  deleteEvent,
} = require('../Controllers/EventController');

router.post('/events', addEvent);
router.get('/events', getAllEvents);
router.delete('/events/:id', deleteEvent);

module.exports = router;
