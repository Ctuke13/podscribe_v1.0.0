import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userId, setUserId] = useState(null);

  // const auth = getAuth();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

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

  const value = {
    currentUser,
    userId,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
