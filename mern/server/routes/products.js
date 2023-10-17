const express = require("express");
const router = express.Router();
const mongodb = require("../db/conn"); // Import your MongoDB module

// Create a new product
router.post("/", (req, res) => {
  const db = mongodb.getDb();
  const productData = req.body; // Assuming the request contains product data

  db.collection("products").insertOne(productData, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create product" });
    }

    return res.status(201).json({ message: "Product created successfully", data: result.ops[0] });
  });
});

// Get all products
router.get("/", (req, res) => {
  const db = mongodb.getDb();

  db.collection("products").find({}).toArray((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch products" });
    }

    return res.json(products);
  });
});

// Get a specific product by ID
router.get("/:id", (req, res) => {
  const db = mongodb.getDb();
  const productId = req.params.id;

  db.collection("products").findOne({ _id: mongodb.ObjectId(productId) }, (err, product) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch product" });
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  });
});

// Update a product by ID
router.put("/:id", (req, res) => {
  const db = mongodb.getDb();
  const productId = req.params.id;
  const updatedProduct = req.body; // Assuming the request contains updated product data

  db.collection("products").updateOne(
    { _id: mongodb.ObjectId(productId) },
    { $set: updatedProduct },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update product" });
      }

      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Product updated successfully" });
    }
  );
});

// Delete a product by ID
router.delete("/:id", (req, res) => {
  const db = mongodb.getDb();
  const productId = req.params.id;

  db.collection("products").deleteOne({ _id: mongodb.ObjectId(productId) }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete product" });
    }

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted successfully" });
  });
});

module.exports = router;
