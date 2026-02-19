const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    flagUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Favorite', favoriteSchema);
