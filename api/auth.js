const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
const auth = require("./verifyToken");
const { registerValidation, loginValidation } = require("../validation");

router.get("/", (req, res) => {
  res.status(200).send({ message: "all good" });
});

router.post("/register", async (req, res) => {
  // validate the data before we register
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if the email exists

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    return res.status(400).json({ message: "email exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // res.header("auth-token", token);
    res.status(200).json({ user: savedUser, token: token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  // validate the data before we register
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if the user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("email does not exist");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("invalid password");
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // res.header("auth-token", token);
  res.json({ user: user, token: token });
});

//
// get cart information of user
router.get("/:uid/cart", auth, async (req, res) => {
  // const userId = req.userData.userId;
  const userId = req.params.uid;
  let result;
  try {
    result = await User.findOne({ _id: userId }).populate("cart.product");
  } catch (error) {
    console.log(error);
  }

  res.json({ cart: result.cart });
});

module.exports = router;
