const Event = require('../Models/EventSchema');

const addEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).send(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  addEvent,
  getAllEvents, 
  deleteEvent,
};
