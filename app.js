const express = require("express");

const mongoose = require("mongoose");
const userRoute = require("./api/auth");
const postRoute = require("./api/posts");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/auth/", userRoute);
app.use("/api/post/", postRoute);

mongoose.connect(process.env.DB_SECRET, { useNewUrlParser: true }, () => {
  console.log("MongoDB is connected");
});

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
