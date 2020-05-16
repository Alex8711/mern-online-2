const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");
const Product = require("../models/Product");
const fileUpload = require("../middleware/file-upload");

router.post("/upload", fileUpload.single("image"), async (req, res) => {
  const { title, description, price } = req.body;
  const product = new Product({
    title,
    description,
    price,
    imagePath: req.file.path,
  });
  const newProduct = await product.save();
  console.log(newProduct);
  res.status(200).send({ newProduct });
});

router.get("/getproducts", async (req, res) => {
  const products = await Product.find();

  console.log(products);
  res.status(200).send({ success: true, products });
});

module.exports = router;
