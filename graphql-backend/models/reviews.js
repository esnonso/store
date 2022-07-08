const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    creator: {
      type: String,
      required: true,
    },
    body: String,
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
