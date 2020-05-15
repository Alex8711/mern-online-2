const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  imagePath: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
