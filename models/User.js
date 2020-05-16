const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      product: {
        type: String,
      },
      quantity: {
        type: Number,

        min: 0,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
