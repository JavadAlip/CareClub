require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const Donation = require('./models/DonationSchema.js'); 

const adminRoutes = require('./Routes/Admin');
const eventRoutes = require('./Routes/User'); 
const volunteerRoutes = require('./Routes/Volunteer');
const donationRoutes = require('./Routes/Donation');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Nodemailer 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send email
const sendEmail = async (to, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Congratulations! You are now a CareClub volunteer',
    text: `Dear ${fullName},\n\nThank you for your interest in becoming a volunteer with CareClub. We are delighted to inform you that you are now officially a volunteer!
    \nWe are excited to have you on board and look forward to your participation. Further details regarding your volunteer activities, orientation sessions, and other important information will be provided soon. Please keep an eye on your email for updates.
    \nIf you have any questions in the meantime, feel free to reach out to us.
    \nBest regards, \nCareClub Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Route to send email
app.post('/api/send-email', async (req, res) => {
  const { fullName, email } = req.body;
  try {
    await sendEmail(email, fullName);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

// Route to create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Route to save donation details after payment
app.post('/api/donations', async (req, res) => {
  const { Name, PhoneNumber, Place, Amount } = req.body;
  try {
    const newDonation = new Donation({
      Name,
      PhoneNumber,
      Place,
      Amount
    });
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error saving donation details:', error);
    res.status(500).json({ error: 'Failed to save donation details' });
  }
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/event', eventRoutes); 
app.use('/api', volunteerRoutes);
app.use('/api', donationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
