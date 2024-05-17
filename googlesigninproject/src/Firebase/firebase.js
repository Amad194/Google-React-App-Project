// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAzSEQsof-8I6c3d69niQ7j4ouTtT-qw8",
  authDomain: "react-app-3d5e0.firebaseapp.com",
  projectId: "react-app-3d5e0",
  storageBucket: "react-app-3d5e0.appspot.com",
  messagingSenderId: "341321968399",
  appId: "1:341321968399:web:d8710370b5ee53d37bec7a",
  measurementId: "G-S7MPPTYGLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };


