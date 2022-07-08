const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Clothes",
        required: true,
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },

    deliveryStatus: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
