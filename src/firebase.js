// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuration object containing Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDgu9I96686MVnkz88LnsieDBYpPgJA4ZY",
  authDomain: "podscribe-6d1b6.firebaseapp.com",
  projectId: "podscribe-6d1b6",
  storageBucket: "podscribe-6d1b6.appspot.com",
  messagingSenderId: "979159090189",
  appId: "1:979159090189:web:a2fa0a6ebb7672b48e4144",
};

// Initialize Firebase with the provided configuration
initializeApp(firebaseConfig);

// // Get a Firestore instance (a reference to the Firestore database)
const db = getFirestore();

// Get an Authentication instance (a reference to Firebase Authentication)
const auth = getAuth();

// // Get a Storage instance (a reference to Firebase Storage)
const storage = getStorage();

// Get currentuser db info
const getUser = async (uid) => {
  try {
    const userDoc = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      console.error("User document does not exist");
      return null; // You can return null or handle this case as needed
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // You can throw the error for handling in the calling code
  }
};

// // Export the Firestore, Authentication, and Storage instances for use in other parts of the application
export { db, auth, storage, getUser };
