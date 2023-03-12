import { StatusCodes, ReasonPhrases } from "http-status-codes";
import registerUserSchema from "../validators/user/registerUserSchema";
import admin from "../services/firebase";

export default {
  register: async (req, res) => {
    const validationResult = registerUserSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: validationResult.error.message,
        message: ReasonPhrases.BAD_REQUEST,
      });
    }

    const { name, email, password } = req.body;

    const adminEmails = ["ek51840@ubt-uni.net", "ab52106@ubt-uni.net"];

    try {
      let user = await admin.auth().createUser({
        email,
        password,
      });

      await admin.auth().updateUser(user.uid, { displayName: name });

      if (adminEmails.includes(user.email)) {
        const userClaims = { admin: true };

        await admin.auth().setCustomUserClaims(user.uid, userClaims);

        await admin.firestore().collection("roles").doc(user.uid).set({
          email: user.email,
          role: userClaims,
        });
      } else {
        const userClaims = { user: true };

        await admin.auth().setCustomUserClaims(user.uid, userClaims);

        await admin.firestore().collection("roles").doc(user.uid).set({
          email: user.email,
          role: userClaims,
        });
      }

      return res.json({ user });
    } catch (error) {
      res.json("Error: " + error);
    }
  },
  usersByClaim: async (req, res) => {
    const claimType = req.params.claim;
    try {
      await admin
        .auth()
        .listUsers()
        .then((listUsersResult) => {
          const usersWithClaim = listUsersResult.users.filter(
            (user) => user.customClaims && user.customClaims[claimType] === true
          );
          res.send(usersWithClaim);
        });
    } catch (error) {
      console.log("Error listing users:", error);
      res.status(500).send("Error listing users");
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      await admin.auth().signInWithEmailAndPassword(email, password);

      res.json("userRecord");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return res.json("Not Found");
      } else if (error.code === "auth/wrong-password") {
        return res.json("Invalid email or password");
      } else {
        return res.json(error.message);
      }
    }
  },
  allUsers: async (req, res) => {
    try {
      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users;

      // users.forEach((user) => {
      //     console.log(`User: ${user.uid}, email: ${user.email}`);
      // });

      return res.json({ users });
    } catch (error) {
      res.json("Error: " + error);
    }
  },
  userById: async (req, res) => {
    const id = req.params.id;

    try {
      const user = await admin.auth().getUser(id);

      return res.json({ user });
    } catch (error) {
      res.json("Error: " + error);
    }
  },
  editUser: async (req, res) => {
    const id = req.params.id;

    try {
      await admin.auth().updateUser(id, {
        displayName: req.body.name,
        // password: req.body.password,
      });

      return res.json("Updated successfully");
    } catch (error) {
      res.json("Error: " + error);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      await admin.auth().deleteUser(id);

      return res.json("Deleted successfully");
    } catch (error) {
      res.json("Error: " + error);
    }
  },
  addAdmin: async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      // Get the current user's custom claims to check if they are an admin
      const currentUser = await admin.auth().getUser(id);

      if (currentUser.customClaims.admin == true) {
        let user = await admin.auth().createUser({
          email,
          password,
        });

        await admin.auth().updateUser(user.uid, { displayName: name });

        const userClaims = { admin: true };

        await admin.auth().setCustomUserClaims(user.uid, userClaims);

        const newAdm = await admin
          .firestore()
          .collection("roles")
          .doc(user.uid)
          .set({
            email: user.email,
            role: userClaims,
          });
        console.log(`User ${user.email} has been added as an admin`);

        return res.json({ user });
      } else {
        console.log("error");
      }
    } catch (error) {
      return res.json("Error: " + error);
    }
  },
};
