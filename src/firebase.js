// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2wf-EimBJAUGr94opJv_9Ga26lnMgJyA",
  authDomain: "nutriline-12738.firebaseapp.com",
  projectId: "nutriline-12738",
  storageBucket: "nutriline-12738.firebasestorage.app",
  messagingSenderId: "431303932121",
  appId: "1:431303932121:web:48e7fce4d7d784ac1566c8",
  measurementId: "G-LBVWEL9JRZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };