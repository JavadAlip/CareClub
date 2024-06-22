// const dotenv = require('dotenv');
// dotenv.config();

// console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);  

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const nodemailer = require('nodemailer');

// const adminRoutes = require('./Routes/Admin');
// const eventRoutes = require('./Routes/User'); 
// const volunteerRoutes = require('./Routes/Volunteer');
// const donationRoutes = require('./Routes/Donation');
// const Donation = require('./Models/DonationSchema'); 

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Function to send email
// const sendEmail = async (to, fullName) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: 'Congratulations! You are now a CareClub volunteer',
//     text: `Dear ${fullName},\n\nThank you for your interest in becoming a volunteer with CareClub. You are now officially a volunteer!\n\nBest regards,\nCareClub Team`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };

// // Route to send email
// app.post('/api/send-email', async (req, res) => {
//   const { fullName, email } = req.body;
//   try {
//     await sendEmail(email, fullName);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     res.status(500).send('Error sending email');
//   }
// });

// // Route to create payment intent
// app.post('/api/create-payment-intent', async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Amount in cents
//       currency: 'usd',
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'Failed to create payment intent' });
//   }
// });


// // Route to save donation details after payment
// app.post('/api/donations', async (req, res) => {
//   const { Name, PhoneNumber, Place, Amount } = req.body;
//   try {
//     const newDonation = new Donation({
//       Name,
//       PhoneNumber,
//       Place,
//       Amount
//     });
//     await newDonation.save();
//     res.status(201).json(newDonation);
//   } catch (error) {
//     console.error('Error saving donation details:', error);
//     res.status(500).json({ error: 'Failed to save donation details' });
//   }
// });

// // Routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/event', eventRoutes); 
// app.use('/api', volunteerRoutes);
// app.use('/api', donationRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const adminRoutes = require('./Routes/Admin');
const eventRoutes = require('./Routes/User'); 
const volunteerRoutes = require('./Routes/Volunteer');
const donationRoutes = require('./Routes/Donation');
const Donation = require('./Models/DonationSchema'); 

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Nodemailer transporter
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
    text: `Dear ${fullName},\n\nThank you for your interest in becoming a volunteer with CareClub. You are now officially a volunteer!\n\nBest regards,\nCareClub Team`
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
