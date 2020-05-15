const express = require("express");

const mongoose = require("mongoose");
const userRoute = require("./api/auth");
const productRoute = require("./api/product");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/auth/", userRoute);
app.use("/api/product/", productRoute);

mongoose.connect(process.env.DB_SECRET, { useNewUrlParser: true }, () => {
  console.log("MongoDB is connected");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
