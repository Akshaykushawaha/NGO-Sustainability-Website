const express = require("express");
const router = express.Router();
const mongodb = require("../your-mongodb-module"); // Import your MongoDB module

// Create a new donation
router.post("/", (req, res) => {
  const db = mongodb.getDb();
  const donationData = req.body; // Assuming the request contains donation data

  db.collection("donations").insertOne(donationData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create donation" });
    }

    return res.status(201).json({ message: "Donation created successfully", data: result.ops[0] });
  });
});

// Get all donations
router.get("/", (req, res) => {
  const db = mongodb.getDb();

  db.collection("donations").find({}).toArray((err, donations) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch donations" });
    }

    return res.json(donations);
  });
});

// Get a specific donation by ID
router.get("/:id", (req, res) => {
  const db = mongodb.getDb();
  const donationId = req.params.id;

  db.collection("donations").findOne({ _id: mongodb.ObjectId(donationId) }, (err, donation) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch donation" });
    }

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    return res.json(donation);
  });
});

// Add more routes as needed

module.exports = router;
