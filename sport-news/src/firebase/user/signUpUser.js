import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'


async function signUpUser(payload){
    const {email, password, username} = payload;
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, email, password);      
    await updateProfile(user, {displayName: username});
    await signOut(auth);

}

export default signUpUser;