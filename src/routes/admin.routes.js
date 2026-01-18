const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
  getUsers,
  updateUserStatus,
  getLoginLogs,
  getStats
} = require("../controllers/admin.controller");

router.use(adminAuth);

router.get("/users", getUsers);
router.patch("/user/status", updateUserStatus);
router.get("/logins", getLoginLogs);
router.get("/stats", getStats);

module.exports = router;
