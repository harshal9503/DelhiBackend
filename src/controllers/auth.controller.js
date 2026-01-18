const User = require("../models/user");
const LoginLog = require("../models/loginLog");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, gender, ticketType } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      gender,
      ticketType
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const checkUserExists = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        exists: false,
        message: "Email not registered"
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        exists: false,
        message: "User is blocked"
      });
    }

    return res.json({ exists: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const validateUser = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        access: false,
        message: "Not registered"
      });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        access: false,
        message: "User blocked"
      });
    }

    res.json({
      access: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logUserLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"];

    await LoginLog.create({
      email,
      ipAddress,
      userAgent
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  checkUserExists,
  validateUser,
  logUserLogin
};
