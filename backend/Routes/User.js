const express = require('express');
const router = express.Router();
const upload = require('../Middleware/multer'); 
const { addEvent, getAllEvents, deleteEvent } = require('../Controllers/EventController');

router.post('/events', upload.single('file'), addEvent);
router.get('/events', getAllEvents);
router.delete('/events/:id', deleteEvent);

module.exports = router;
