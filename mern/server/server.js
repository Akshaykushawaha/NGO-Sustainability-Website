const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Import your MongoDB module
const mongodb = require("./db/conn");

// Import your product, user, and donation routes
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/userinfo");
const donationRoutes = require("./routes/donation");

// Use your routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/donations", donationRoutes);

app.listen(port, () => {
  // Perform database connections when the server starts
  mongodb.connectToServer("productinfo", function (err) {
    if (err) console.error(err);
  });

  mongodb.connectToServer("userinfo", function (err) {
    if (err) console.error(err);
  });

  mongodb.connectToServer("donationdb", function (err) {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);
});
