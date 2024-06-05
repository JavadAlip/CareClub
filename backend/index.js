const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./Routes/Admin'); // Ensure this path is correct
const eventRoutes = require('./Routes/User'); // Ensure this path is correct

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Admin routes
app.use('/api/admin', adminRoutes);

// Event routes
app.use('/api/event', eventRoutes);

// Listen on the port defined in .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
