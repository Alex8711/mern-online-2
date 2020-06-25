const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");
const Product = require("../models/Product");
const User = require("../models/User");
const fileUpload = require("../middleware/file-upload");
const mongoose = require("mongoose");

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
  const { productAddId, quantity } = req.body;
  await User.findOne({ _id: req.userData.userId }, (err, userInfo) => {
    let duplicate = false;
    console.log(productAddId);
    userInfo.cart.forEach((cartInfo) => {
      if (cartInfo.product.toString() === productAddId) {
        duplicate = true;
      }
    });
    console.log(duplicate);
    if (duplicate) {
      User.updateOne(
        {
          _id: req.userData.userId,
          "cart.product": productAddId,
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
          // User.findOneAndUpdate(
          //   { _id: userInfo._id },
          //   { $pull: { cart: { quantity: 0 } } },
          //   { new: true }
          // );
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      User.updateOne(
        {
          _id: req.userData.userId,
        },
        {
          $push: {
            cart: {
              product: productAddId,
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
  // await User.findOneAndUpdate(
  //   { _id: req.userData.userId, "cart.quantity": 0 },
  //   { $pull: { cart: { quantity: 0 } } },
  //   { new: true },
  //   (err, userInfo) => {
  //     let cart = userInfo.cart;
  //     return res.status(200).json({ cart });
  //   }
  // );
});

router.post("/removeFromCart", auth, (req, res) => {
  const { productRemoveId } = req.body;
  // const removeId = mongoose.Types.ObjectId(productRemoveId);
  User.findOneAndUpdate(
    { _id: req.userData.userId },
    { $pull: { cart: { product: productRemoveId } } },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      return res.status(200).json({ cart });
    }
  );
});

module.exports = router;
