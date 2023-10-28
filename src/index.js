import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// init services
const db = getFirestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
