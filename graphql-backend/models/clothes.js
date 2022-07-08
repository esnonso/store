const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clothesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    sizes: {
      type: String,
      required: true,
    },
    amountInStock: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    colors: String,
    image: [
      {
        url: String,
        filename: String,
      },
    ],

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clothes", clothesSchema);
