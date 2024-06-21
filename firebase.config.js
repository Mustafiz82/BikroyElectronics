// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt2Sg-Fe4H8uLBzRvMdwPny7ZeDSLFmGI",
  authDomain: "bikroyelectronics.firebaseapp.com",
  projectId: "bikroyelectronics",
  storageBucket: "bikroyelectronics.appspot.com",
  messagingSenderId: "143785820093",
  appId: "1:143785820093:web:1958f09625fe24c9101cd4",
  measurementId: "G-Y74QPGHHKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
export default auth