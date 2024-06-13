const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
