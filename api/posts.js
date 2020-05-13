const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("./verifyToken");

router.get("/", auth, (req, res) => {
  res.status(200).send({ message: "these are posts data" });
});

module.exports = router;
