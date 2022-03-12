import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
var axios = require("axios");

const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export default async function googleAuth() {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential != null) {
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
      //TODO change post route url
      var data = JSON.stringify({
        displayName: user.displayName,
        email: user.email,
      });

      var config = {
        method: "POST",
        mode: "cors",
        credentials: "include",
        url: `${process.env.BACKEND_URL}/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(async function (response) {
          window.location.reload();
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      //email of user
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return;
    });
}
