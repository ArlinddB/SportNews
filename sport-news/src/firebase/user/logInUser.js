import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

async function logInUser(payload) {
  const auth = getAuth();

  const { email, password } = payload;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("User does not exists");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Wrong password");
    }
  }
}

export default logInUser;
