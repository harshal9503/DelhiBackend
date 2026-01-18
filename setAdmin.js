const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const ADMIN_UID = "3qaEKBjPs8RUxhaEr7xsih45f4l1";

async function setAdmin() {
  try {
    await admin.auth().setCustomUserClaims(ADMIN_UID, {
      admin: true,
    });

    console.log("Admin role assigned successfully");
    process.exit();
  } catch (error) {
    console.error("Error setting admin role:", error);
    process.exit(1);
  }
}

setAdmin();
