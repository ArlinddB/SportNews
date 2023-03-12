// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, connectAuthEmulator } from 'firebase/auth'
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpCfgg1cSvvCBUgVEiJZmtfaApT2aUQuU",
  authDomain: "sport-news-87005.firebaseapp.com",
  projectId: "sport-news-87005",
  storageBucket: "sport-news-87005.appspot.com",
  messagingSenderId: "679667017827",
  appId: "1:679667017827:web:b27073850ace64fd76b056"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099');

// connectFunctionsEmulator(getFunctions(), 'http://127.0.0.1:5001');

export default app;