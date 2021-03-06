const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./api/auth");
const productRoute = require("./api/product");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/uploads/images", express.static(path.join("uploads", "images")));
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(process.env.DB_SECRET, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
