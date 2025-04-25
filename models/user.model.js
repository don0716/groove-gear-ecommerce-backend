const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: String,
  state: String,
  pincode: String,
  phone: String,
});

const cartItemsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instrument",
      required: true,
    },
    quantity: { type: Number, default: 1, min: 1, max: 10 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instrument" }],
    cart: [cartItemsSchema],
    addresses: [addressSchema],
    defaultAddressId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
