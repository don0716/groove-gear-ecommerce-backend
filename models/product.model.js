const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    available: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Instrument = mongoose.model("Instrument", productSchema);
module.exports = Instrument;
