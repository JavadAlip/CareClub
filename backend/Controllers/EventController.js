const express = require('express');
const router = express.Router();
const Event = require('../Models/event');

// Create Event
router.post('/events', async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.send(events);
  } catch (error) {
    res.status(500).send();
  }
});

// Update Event
router.patch('/events/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'date', 'imageUrl'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).send();
    }

    updates.forEach((update) => event[update] = req.body[update]);
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      res.status(404).send();
    }

    res.send(event);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
