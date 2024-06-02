// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeQ_htkKKCqR093dXn9DGIm-mgfVcMvzI",
  authDomain: "sample-auth-89622.firebaseapp.com",
  projectId: "sample-auth-89622",
  storageBucket: "sample-auth-89622.appspot.com",
  messagingSenderId: "552278750842",
  appId: "1:552278750842:web:6da9f61c1b0a2a067eedc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
