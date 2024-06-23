const Event = require('../Models/EventSchema');

const addEvent = async (req, res) => {
  const { title, description, date, imageUrl, place } = req.body; 
  try {
    if (!imageUrl) {
      return res.status(400).json({ message: "No image URL provided" });
    }

    const event = new Event({
      title,
      description,
      date,
      imageUrl,
      place,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to fetch all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Controller function to delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully', deletedEvent: event });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = { addEvent, getAllEvents, deleteEvent };
