import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyASidlpcN8577zLVSJZNIDt-xN-VNFUpn4",
  authDomain: "genweb-cb37b.firebaseapp.com",
  projectId: "genweb-cb37b",
  storageBucket: "genweb-cb37b.firebasestorage.app",
  messagingSenderId: "1048394914753",
  appId: "1:1048394914753:web:f23c1ecb6e2ce01ced6d40"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export { auth, provider };
