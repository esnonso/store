const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: String,

    address: String,

    status: {
      type: String,
      default: "user",
    },
    accountStatus: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    clothesBought: [
      {
        type: Schema.Types.ObjectId,
        ref: "Orders",
      },
    ],
    clothesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Clothes",
      },
    ],

    resetPasswordToken: String,

    resetPasswordTokenExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
