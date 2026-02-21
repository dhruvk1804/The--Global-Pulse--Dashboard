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

    if (!countryName || !flagUrl) {
      return res.status(400).json({ message: 'countryName and flagUrl are required' });
    }

    const existing = await Favorite.findOne({ countryName }); // ✅ ADDED: duplicate check
    if (existing) {
      return res.status(409).json({ message: `${countryName} is already in your favorites` }); // ✅ ADDED
    }

    const favorite = await Favorite.create({ countryName, flagUrl });
    res.status(201).json(favorite);
  } catch (err) {
    console.error('POST Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => { // ✅ CHANGED: /:id instead of /countryName
  try {
    const deleted = await Favorite.findByIdAndDelete(req.params.id); // ✅ CHANGED: findByIdAndDelete
    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
