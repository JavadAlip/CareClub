const Volunteer = require('../Models/VolunteerSchema');

const addVolunteer= async (req,res)=>{
    const { fullName, email, address, subject } = req.body;
    const newVolunteer = new Volunteer({ fullName, email, address, subject });
    try {
      const savedVolunteer = await newVolunteer.save();
      res.status(201).json(savedVolunteer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const getVolunteer = async (req, res) => {
    try {
      const volunteers = await Volunteer.find();
      res.json(volunteers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 

  module.exports = { getVolunteer,addVolunteer}