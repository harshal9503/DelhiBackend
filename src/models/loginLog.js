const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String
});

module.exports = mongoose.model("LoginLog", loginLogSchema);
