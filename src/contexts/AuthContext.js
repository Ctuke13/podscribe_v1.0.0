import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// Creates a React context named AuthContext. This context will be used to share authentication-related data and functions with components down the component tree.
const AuthContext = React.createContext();

//Exports a custom hook named useAuth. This hook allows other components to access the authentication context and its values.
export function useAuth() {
  return useContext(AuthContext);
}

// Defines the AuthProvider functional component, which will manage the authentication context.
export default function AuthProvider({ children }) {
  //Declares two state variables, currentUser and userId, using the useState hook. These variables will store the current user's data.
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Defines a signUp function that uses Firebase's createUserWithEmailAndPassword function to create a new user with the provided email and password.
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User Credential:", userCredential);
        console.log("User created:", userCredential.user);
        return userCredential; // Return the user credential for further use
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        throw error; // Throw the error to handle it elsewhere if needed
      });
  }

  // Sets up a listener for authentication state changes using the onAuthStateChanged function. When the authentication state changes (user signs in or out), it updates the currentUser and userId state variables.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setUserId(user.uid);
      } else {
        setCurrentUser(null);
        setUserId(null);
      }
    });
    return unsubscribe;
  }, []);

  // Create a value object containing currentUser, userId, and signUp to provide to the context.
  const value = {
    currentUser,
    userId,
    signUp,
  };

  // Create a value object containing currentUser, userId, and signUp to provide to the context.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
