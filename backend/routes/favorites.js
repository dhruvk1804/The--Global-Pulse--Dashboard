const express = require('express');
const Favorite = require('../models/Favorite');

const router = express.Router();

// GET /api/favorites
router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/favorites
router.post('/', async (req, res) => {
  try {
    const { countryName, flagUrl } = req.body;

    console.log('Request body:', req.body); // ADD THIS

    if (!countryName || !flagUrl) {
      return res.status(400).json({ message: 'countryName and flagUrl are required' });
    }

    const favorite = await Favorite.create({ countryName, flagUrl });
    res.status(201).json(favorite);
  } catch (err) {
    console.error('POST Error:', err.message); // ADD THIS
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// DELETE /api/favorites/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Favorite.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
