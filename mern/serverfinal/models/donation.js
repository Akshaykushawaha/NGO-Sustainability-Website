const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields specific to your donation data
});

module.exports = mongoose.model('Donation', donationSchema);
