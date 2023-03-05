import {signInWithEmailAndPassword, getAuth} from 'firebase/auth';

async function logInUser(payload){
    const { email, password } = payload;
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    const { user } = response;
    return user;
}

export default logInUser;