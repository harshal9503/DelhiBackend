const express = require("express");
const router = express.Router();

const {
  registerUser,
  checkUserExists,
  validateUser,
  logUserLogin
} = require("../controllers/auth.controller");

router.post("/register", registerUser);

router.get("/user/check", checkUserExists);

router.get("/user/validate", validateUser);
router.post("/login/log", logUserLogin);

module.exports = router;
