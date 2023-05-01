import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import axios from "axios";

async function logInUser(payload) {
  const auth = getAuth();

  const { email, password } = payload;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    const res = await axios.get(
      `${process.env.VUE_APP_API}users/${user.id}`
    );
    
    const { data } = res.data; 
    return data;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("User does not exists");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Wrong password");
    }
  }
}

export default logInUser;
