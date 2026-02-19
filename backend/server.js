const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const favoritesRoutes = require('./routes/favorites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/global-pulse';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Quote route
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get(`https://zenquotes.io/api/random?t=${Date.now()}`);
    res.json(response.data[0]);
  } catch (err) {
    res.status(500).json({ q: 'Keep going.', a: 'Unknown' });
  }
});


// Favorites routes
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
