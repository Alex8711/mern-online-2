const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");
const Product = require("../models/Product");
const fileUpload = require("../middleware/file-upload");

router.post("/upload", fileUpload.single("image"), (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = new Product({
    title,
    description,
    price,
  });
  newProduct.save();
  console.log(newProduct);
  res.status(200).send({ message: "these are posts data" });
});

module.exports = router;
