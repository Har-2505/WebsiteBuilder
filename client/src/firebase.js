// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genweb-cb37b.firebaseapp.com",
  projectId: "genweb-cb37b",
  storageBucket: "genweb-cb37b.firebasestorage.app",
  messagingSenderId: "1048394914753",
  appId: "1:1048394914753:web:f23c1ecb6e2ce01ced6d40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
