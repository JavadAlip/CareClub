const Donation = require('../Models/DonationSchema');

const addDonation = async (req, res) => {
  const { Name, PhoneNumber, Place, Amount } = req.body;
  const newDonation = new Donation({ Name, PhoneNumber, Place, Amount });

  try {
    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDonation = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addDonation, getDonation };


