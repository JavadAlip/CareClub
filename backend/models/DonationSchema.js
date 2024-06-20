const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },
  Place: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Donation', DonationSchema);




// // models/Donation.js
// const mongoose = require('mongoose');

// const donationSchema = new mongoose.Schema({
//   donorName: {
//     type: String,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   place: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   sessionId: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Donation = mongoose.model('Donation', donationSchema);

// module.exports = Donation;
