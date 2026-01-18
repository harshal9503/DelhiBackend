const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    gender: String,
    ticketType: String,
    status: {
      type: String,
      default: "registered"
    },
    registrationSource: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
