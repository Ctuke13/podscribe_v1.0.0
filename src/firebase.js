import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgu9I96686MVnkz88LnsieDBYpPgJA4ZY",
  authDomain: "podscribe-6d1b6.firebaseapp.com",
  projectId: "podscribe-6d1b6",
  storageBucket: "podscribe-6d1b6.appspot.com",
  messagingSenderId: "979159090189",
  appId: "1:979159090189:web:a2fa0a6ebb7672b48e4144",
};

// init firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage };
