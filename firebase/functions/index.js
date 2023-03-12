const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

const adminEmails = ["ab52106@ubt-uni.net", "ek51840@ubt-uni.net"];


exports.addUserRole = functions.auth.user().onCreate(async (user) => {
  try {
    if (adminEmails.includes(user.email)) {
        
        const userClaims = { admin: true }
        await admin.auth().setCustomUserClaims(user.uid, userClaims);

        db.collection("roles").doc(user.uid).set({
            email: user.email,
            role: userClaims,
        });
      
    } else {

        const userClaims = { user: true }
        await admin.auth().setCustomUserClaims(user.uid, userClaims);

        db.collection("roles").doc(user.uid).set({
            email: user.email,
            role: userClaims,
        });

    }
  } catch (err) {
    console.log(err);
  }
});
