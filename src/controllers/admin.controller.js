const User = require("../models/user");
const LoginLog = require("../models/loginLog");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};  

const updateUserStatus = async (req, res) => {
  try {
    const { email, status } = req.body;

    if (!email || !status) {
      return res.status(400).json({ message: "Email and status required" });
    }

    await User.updateOne(
      { email },
      { $set: { status } }
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getLoginLogs = async (req, res) => {
  try {
    const logs = await LoginLog.find().sort({ loginTime: -1 });
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLogins = await LoginLog.countDocuments();
    const uniqueUsers = await LoginLog.distinct("email");

    res.json({
      totalUsers,
      totalLogins,
      uniqueLoggedInUsers: uniqueUsers.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  updateUserStatus,
  getLoginLogs,
  getStats
};
