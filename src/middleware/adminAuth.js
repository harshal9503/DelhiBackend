const admin = require("../config/firebaseAdmin");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken.admin) {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
