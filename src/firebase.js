// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { useEffect } from "react";
import env from "react-dotenv";
// import firebase from "firebase/compat/app";
// Your web app's Firebase configuration

const firebaseConfig = {
  // apiKey: env.ANIME_API_KEY,
  apiKey: env.ANIME_API_KEY,
  authDomain: "sample-auth-89622.firebaseapp.com",
  projectId: "sample-auth-89622",
  storageBucket: "sample-auth-89622.appspot.com",
  messagingSenderId: "552278750842",
  appId: "1:552278750842:web:6da9f61c1b0a2a067eedc3",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
