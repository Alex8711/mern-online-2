const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");
const Product = require("../models/Product");
const User = require("../models/User");
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
  res.status(200).send({ newProduct });
});

//get all products
router.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  res.status(200).send({ success: true, products });
});

//get one product by id
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    console.log(error);
  }
  res.json({ product: product });
});

// add a product to the cart
router.post("/addToCart", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  User.findOne({ _id: req.userData.userId }, (err, userInfo) => {
    let duplicate = false;
    userInfo.cart.forEach((cartInfo) => {
      if (cartInfo.product === productId) {
        duplicate = true;
      }
    });
    if (duplicate) {
      User.findOneAndUpdate(
        {
          _id: req.userData.userId,
          "cart.product": productId,
        },
        {
          $inc: {
            "cart.$.quantity": quantity,
          },
        },
        {
          new: true,
        },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      User.findByIdAndUpdate(
        {
          _id: req.userData.userId,
        },
        {
          $push: {
            cart: {
              product: productId,
              quantity: quantity,
            },
          },
        },
        {
          new: true,
        },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

module.exports = router;
