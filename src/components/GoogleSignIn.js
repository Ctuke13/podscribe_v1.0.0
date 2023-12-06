import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
