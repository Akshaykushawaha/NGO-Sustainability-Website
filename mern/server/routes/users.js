const express = require("express");
const router = express.Router();
const mongodb = require("../your-mongodb-module"); // Import your MongoDB module

// Create a new user
router.post("/", (req, res) => {
  const db = mongodb.getDb();
  const userData = req.body; // Assuming the request contains user data

  db.collection("users").insertOne(userData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create user" });
    }

    return res.status(201).json({ message: "User created successfully", data: result.ops[0] });
  });
});

// Get all users
router.get("/", (req, res) => {
  const db = mongodb.getDb();

  db.collection("users").find({}).toArray((err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }

    return res.json(users);
  });
});

// Get a specific user by ID
router.get("/:id", (req, res) => {
  const db = mongodb.getDb();
  const userId = req.params.id;

  db.collection("users").findOne({ _id: mongodb.ObjectId(userId) }, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch user" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  });
});
// Sign-in route
router.post("/signin", (req, res) => {
    const db = mongodb.getDb();
    const { username, password } = req.body; // Assuming you send username and password in the request
  
    // Check user credentials against your database
    db.collection("users").findOne({ username, password }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred" });
      }
  
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // On successful sign-in, you can return user information or a token
      return res.status(200).json({ message: "Sign-in successful", user });
    });
  });
  
// Add more routes as needed

module.exports = router;
