const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

require('./db/conn'); // Import and execute the conn.js file for MongoDB connection

// Import your User model and other routes
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const donationRoutes = require('./routes/donation');

// Use your routes
app.use('/productinfo', productRoutes);
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);

app.get('/', (req, resp) => {
  resp.send('App is Working');
});

// Error handling middleware
app.use((err, req, resp, next) => {
  console.error(err);
  resp.status(500).send('Something Went Wrong');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
