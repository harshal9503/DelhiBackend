const admin = require("firebase-admin");

function loadServiceAccount() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON env variable");
  }

  return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
}

admin.initializeApp({
  credential: admin.credential.cert(loadServiceAccount()),
});

module.exports = admin;
