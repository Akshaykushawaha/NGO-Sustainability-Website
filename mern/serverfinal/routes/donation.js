const express = require('express');
const router = express.Router();

// Import the Donation model
const Donation = require('../models/donation');

// Create a new donation
router.post('/', async (req, res) => {
  try {
    const donationData = req.body;
    const donation = new Donation(donationData);
    const savedDonation = await donation.save();
    res.status(201).json({ message: 'Donation created successfully', data: savedDonation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create donation' });
  }
});

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find({});
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// Get a specific donation by ID
router.get('/:id', async (req, res) => {
  try {
    const donationId = req.params.id;
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch donation' });
  }
});

// Add more routes as needed

module.exports = router;
